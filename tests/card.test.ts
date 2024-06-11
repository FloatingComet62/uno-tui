import { cardToCode, codeToCard, initCard } from '../src/card';

describe('Serialization of Card', () => {
	test('Serialize Card', () => {
		expect(cardToCode(initCard('+2', 'black'))).toBe('k+2');
		expect(cardToCode(initCard('Reverse', 'red'))).toBe('rr');
		expect(cardToCode(initCard('Skip', 'green'))).toBe('gs');
		expect(cardToCode(initCard('5', 'yellow'))).toBe('y5');
	});
	test('Deserializing Card', () => {
		expect(codeToCard('k+2')).toEqual(initCard('+2', 'black'));

		expect(codeToCard('rr')).toEqual(initCard('Reverse', 'red'));
		expect(codeToCard('rR')).toEqual(initCard('Reverse', 'red'));

		expect(codeToCard('gs')).toEqual(initCard('Skip', 'green'));
		expect(codeToCard('gS')).toEqual(initCard('Skip', 'green'));

		expect(codeToCard('y5')).toEqual(initCard('5', 'yellow'));
	});
});
