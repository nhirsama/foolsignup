package password

import "strings"

type ComplexityLevel string

const (
	ComplexitySimple  ComplexityLevel = "simple"
	ComplexityMedium  ComplexityLevel = "medium"
	ComplexityComplex ComplexityLevel = "complex"
)

type Report struct {
	Score int
	Level ComplexityLevel
}

const specialCharset = "~!@#$%^&*()_-+=|\\{}[]:;\"'<>,.?/"

func ValidateRegistrationPassword(password string) string {
	if msg := ValidateBaseline(password); msg != "" {
		return msg
	}
	if Evaluate(password).Level != ComplexityComplex {
		return "密码复杂度不足，请重新设计"
	}
	return ""
}

func ValidateBaseline(password string) string {
	if len(password) < 32 {
		return "密码长度必须大于等于 32 位"
	}

	var hasLower, hasUpper, hasDigit, hasSpecial bool
	for _, r := range password {
		switch {
		case r >= 'a' && r <= 'z':
			hasLower = true
		case r >= 'A' && r <= 'Z':
			hasUpper = true
		case r >= '0' && r <= '9':
			hasDigit = true
		case strings.ContainsRune(specialCharset, r):
			hasSpecial = true
		}
	}

	switch {
	case !hasLower:
		return "密码必须包含小写字母"
	case !hasUpper:
		return "密码必须包含大写字母"
	case !hasDigit:
		return "密码必须包含数字"
	case !hasSpecial:
		return "密码必须包含特殊符号"
	default:
		return ""
	}
}

func Evaluate(password string) Report {
	bytes := []byte(password)
	if len(bytes) == 0 {
		return Report{Score: 0, Level: ComplexitySimple}
	}

	sumPi, maxPi, lastPi := prefixStats(bytes)
	longestPal := longestPalindromeLen(bytes)
	dup3 := duplicateWindowCount(bytes, 3)
	dup4 := duplicateWindowCount(bytes, 4)
	mono := longestConsecutiveRun(bytes)
	distinct := distinctByteCount(bytes)
	hasPeriod := hasExactPeriod(len(bytes), lastPi)

	score := 0
	score += scoreLength(len(bytes))
	score += scoreDistinct(distinct)
	score += scorePrefix(maxPi, sumPi)
	score += scorePalindrome(longestPal)
	score += scoreDuplicateWindows(dup3, dup4)
	score += scoreMonotonicRun(mono)
	if hasPeriod {
		score -= 34
	}

	score = clamp(score, 0, 100)

	level := ComplexitySimple
	switch {
	case score < 52:
		level = ComplexitySimple
	case score < 84:
		level = ComplexityMedium
	case hiddenGate(bytes, sumPi, longestPal, dup4):
		level = ComplexityComplex
	default:
		level = ComplexityMedium
	}

	return Report{
		Score: score,
		Level: level,
	}
}

func scoreLength(length int) int {
	switch {
	case length >= 48:
		return 32
	case length >= 40:
		return 30
	case length >= 32:
		return 28
	case length >= 24:
		return 14
	default:
		return 4
	}
}

func scoreDistinct(distinct int) int {
	switch {
	case distinct >= 20:
		return 18
	case distinct >= 16:
		return 10
	case distinct >= 13:
		return 4
	default:
		return -10
	}
}

func scorePrefix(maxPi, sumPi int) int {
	score := 0
	switch {
	case maxPi == 0:
		score += 14
	case maxPi <= 1:
		score += 10
	case maxPi <= 3:
		score += 5
	default:
		score -= 8
	}

	switch {
	case sumPi == 0:
		score += 8
	case sumPi <= 2:
		score += 5
	case sumPi <= 5:
		score += 2
	default:
		score -= 8
	}

	return score
}

func scorePalindrome(longestPal int) int {
	switch {
	case longestPal <= 3:
		return 14
	case longestPal == 4:
		return 6
	case longestPal == 5:
		return -4
	default:
		return -18
	}
}

func scoreDuplicateWindows(dup3, dup4 int) int {
	score := 0
	if dup3 == 0 {
		score += 8
	} else {
		score -= 10 + min(dup3, 3)*4
	}

	if dup4 == 0 {
		score += 8
	} else {
		score -= 12 + min(dup4, 3)*5
	}

	return score
}

func scoreMonotonicRun(longest int) int {
	switch {
	case longest <= 2:
		return 10
	case longest == 3:
		return 4
	case longest == 4:
		return -12
	default:
		return -22
	}
}

func prefixStats(s []byte) (sumPi int, maxPi int, lastPi int) {
	if len(s) == 0 {
		return 0, 0, 0
	}

	pi := make([]int, len(s))
	for i := 1; i < len(s); i++ {
		j := pi[i-1]
		for j > 0 && s[i] != s[j] {
			j = pi[j-1]
		}
		if s[i] == s[j] {
			j++
		}
		pi[i] = j
		sumPi += j
		if j > maxPi {
			maxPi = j
		}
	}

	return sumPi, maxPi, pi[len(pi)-1]
}

func hasExactPeriod(length int, lastPi int) bool {
	if length == 0 {
		return false
	}

	period := length - lastPi
	return period < length && period > 0 && length%period == 0
}

func longestPalindromeLen(s []byte) int {
	if len(s) == 0 {
		return 0
	}

	transformed := make([]int, 0, len(s)*2+1)
	for _, b := range s {
		transformed = append(transformed, -1, int(b))
	}
	transformed = append(transformed, -1)

	radius := make([]int, len(transformed))
	center, right, best := 0, 0, 1
	for i := 0; i < len(transformed); i++ {
		if i < right {
			mirror := 2*center - i
			radius[i] = min(right-i, radius[mirror])
		}

		for i-1-radius[i] >= 0 && i+1+radius[i] < len(transformed) &&
			transformed[i-1-radius[i]] == transformed[i+1+radius[i]] {
			radius[i]++
		}

		if i+radius[i] > right {
			center = i
			right = i + radius[i]
		}
		if radius[i] > best {
			best = radius[i]
		}
	}

	return best
}

func duplicateWindowCount(s []byte, window int) int {
	if len(s) < window {
		return 0
	}

	seen := make(map[string]struct{}, len(s)-window+1)
	duplicates := 0
	for i := 0; i+window <= len(s); i++ {
		key := string(s[i : i+window])
		if _, ok := seen[key]; ok {
			duplicates++
			continue
		}
		seen[key] = struct{}{}
	}

	return duplicates
}

func longestConsecutiveRun(s []byte) int {
	if len(s) == 0 {
		return 0
	}

	best, run, direction := 1, 1, 0
	for i := 1; i < len(s); i++ {
		diff := int(s[i]) - int(s[i-1])
		switch diff {
		case 1:
			if direction >= 0 {
				run++
			} else {
				run = 2
			}
			direction = 1
		case -1:
			if direction <= 0 {
				run++
			} else {
				run = 2
			}
			direction = -1
		default:
			run = 1
			direction = 0
		}

		if run > best {
			best = run
		}
	}

	return best
}

func distinctByteCount(s []byte) int {
	seen := make(map[byte]struct{}, len(s))
	for _, b := range s {
		seen[b] = struct{}{}
	}
	return len(seen)
}

func hiddenGate(s []byte, sumPi, longestPal, dup4 int) bool {
	const (
		base = 257
		mod  = 1000000007
	)

	hash := 0
	for i, b := range s {
		hash = (hash*base + int(b) + (i%7+1)*11) % mod
	}

	gate := (hash + sumPi*7 + longestPal*13 + dup4*17 + len(s)*19) % 19
	return gate == 0 || gate == 7 || gate == 13
}

func clamp(value, low, high int) int {
	if value < low {
		return low
	}
	if value > high {
		return high
	}
	return value
}

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}
