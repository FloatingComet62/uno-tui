import { codeToColor, colorToCode } from '../src/color';

describe('Serialization of Color', () => {
	test('Serialize Color', () => {
		expect(colorToCode('black')).toBe('k');
		expect(colorToCode('blue')).toBe('b');
		expect(colorToCode('green')).toBe('g');
		expect(colorToCode('red')).toBe('r');
		expect(colorToCode('yellow')).toBe('y');
	});
	test('Deserialize Color', () => {
		expect(codeToColor('k')).toBe('black');
		expect(codeToColor('b')).toBe('blue');
		expect(codeToColor('g')).toBe('green');
		expect(codeToColor('r')).toBe('red');
		expect(codeToColor('y')).toBe('yellow');
	});
});
