package password

import "testing"

func TestValidateBaseline(t *testing.T) {
	cases := []struct {
		name     string
		password string
		want     string
	}{
		{
			name:     "too short",
			password: "Ab1!short",
			want:     "密码长度必须大于等于 32 位",
		},
		{
			name:     "missing special",
			password: "Abcdefghijklmnopqrstuvwxyz123456",
			want:     "密码必须包含特殊符号",
		},
		{
			name:     "valid baseline",
			password: "Qx7!mR2@pL9#sV4$kN8%tH3^wC6&yB1*",
			want:     "",
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			if got := ValidateBaseline(tc.password); got != tc.want {
				t.Fatalf("ValidateBaseline(%q) = %q, want %q", tc.password, got, tc.want)
			}
		})
	}
}

func TestEvaluateComplexityLevels(t *testing.T) {
	cases := []struct {
		name     string
		password string
		want     ComplexityLevel
	}{
		{
			name:     "repetitive simple password",
			password: "Aa1!Aa1!Aa1!Aa1!Aa1!Aa1!Aa1!Aa1!",
			want:     ComplexitySimple,
		},
		{
			name:     "high score but gate fails",
			password: "Qx7!mR2@pL9#sV4$kN8%tH3^wC6&yB1*",
			want:     ComplexityMedium,
		},
		{
			name:     "carefully tuned complex password",
			password: "Qx7!mR2@pL9#sV4$kN8%tH3^wC6&yBAF",
			want:     ComplexityComplex,
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			report := Evaluate(tc.password)
			if report.Level != tc.want {
				t.Fatalf("Evaluate(%q).Level = %s, want %s (score=%d)", tc.password, report.Level, tc.want, report.Score)
			}
		})
	}
}

func TestValidateRegistrationPassword(t *testing.T) {
	if msg := ValidateRegistrationPassword("Qx7!mR2@pL9#sV4$kN8%tH3^wC6&yB1*"); msg != "密码复杂度不足，请重新设计" {
		t.Fatalf("unexpected validation result: %q", msg)
	}

	if msg := ValidateRegistrationPassword("Qx7!mR2@pL9#sV4$kN8%tH3^wC6&yBAF"); msg != "" {
		t.Fatalf("expected complex password to pass, got %q", msg)
	}
}
