import { validateNicknameFormat } from "./nickname";

describe("validateNicknameFormat", () => {
    describe.each([
        "bob_test",
        "some_cool_nick",
        "my _ name"
    ])("when nickname contains an underscore (%s)", (input) => {
        test("should return 'Invalid characters in name'", () => {
            const result = validateNicknameFormat(input);

            expect(result).toEqual("Invalid characters in name");
        });
    });

    describe.each([
        "bob",
        "a",
        "",
        null
    ])("when nickname is too short (%s)", (input) => {
        test("should return 'Nickname must be at least 4 characters long'", () => {
            const result = validateNicknameFormat(input);

            expect(result).toEqual("Nickname must be at least 4 characters long");
        });
    });

    describe.each([
        "a really really long nickname",
        "abcdefghijklmnopq"
    ])("when nickname is too long (%s)", (input) => {
        test("should return 'Name too long'", () => {
            const result = validateNicknameFormat(input);

            expect(result).toEqual("Name too long");
        });
    });

    describe.each([
        "jkm 1234",
        "Bob the Chess99"
    ])("when nickname is valid", (input) => {
        test("should return null", () => {
            const result = validateNicknameFormat(input);

            expect(result).toEqual(null);
        });
    });
});
