/**
 * Form validation utilities
 * Following KISS and DRY principles
 */

export interface ValidationResult {
	isValid: boolean;
	error?: string;
}

/**
 * Validate email format
 */
export function validateEmail(email: string): ValidationResult {
	if (!email) {
		return { isValid: false, error: 'Email is required' };
	}

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
		return { isValid: false, error: 'Please enter a valid email address' };
	}

	return { isValid: true };
}

/**
 * Validate password
 */
export function validatePassword(password: string, minLength: number = 8): ValidationResult {
	if (!password) {
		return { isValid: false, error: 'Password is required' };
	}

	if (password.length < minLength) {
		return {
			isValid: false,
			error: `Password must be at least ${minLength} characters long`
		};
	}

	return { isValid: true };
}

/**
 * Validate required field
 */
export function validateRequired(value: string, fieldName: string): ValidationResult {
	if (!value || value.trim() === '') {
		return { isValid: false, error: `${fieldName} is required` };
	}

	return { isValid: true };
}

/**
 * Validate password confirmation
 */
export function validatePasswordMatch(
	password: string,
	confirmPassword: string
): ValidationResult {
	if (!confirmPassword) {
		return { isValid: false, error: 'Please confirm your password' };
	}

	if (password !== confirmPassword) {
		return { isValid: false, error: 'Passwords do not match' };
	}

	return { isValid: true };
}

/**
 * Validate form fields
 */
export function validateForm(
	fields: Record<string, { value: string; validators: Array<(value: string) => ValidationResult> }>
): Record<string, string> {
	const errors: Record<string, string> = {};

	Object.entries(fields).forEach(([fieldName, { value, validators }]) => {
		for (const validator of validators) {
			const result = validator(value);
			if (!result.isValid && result.error) {
				errors[fieldName] = result.error;
				break;
			}
		}
	});

	return errors;
}

