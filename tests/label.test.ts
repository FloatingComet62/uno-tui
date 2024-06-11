import { codeToLabel, labelToCode } from '../src/label';

describe('Serialization of Label', () => {
	test('Serialize Label', () => {
		expect(labelToCode('7')).toBe('7');
		expect(labelToCode('+4')).toBe('+4');
		expect(labelToCode('Reverse')).toBe('r');
		expect(labelToCode('Skip')).toBe('s');
	});
	test('Deserialize Label', () => {
		expect(codeToLabel('7')).toBe('7');
		expect(codeToLabel('+4')).toBe('+4');
		expect(codeToLabel('r')).toBe('Reverse');
		expect(codeToLabel('s')).toBe('Skip');
	});
});
