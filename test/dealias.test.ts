import { TAliased } from "../src/alias"
import dealias, { getCharCode } from "../src/dealias"

describe("Get Char Code", () => {


    test("Test 1", () => {
        expect(getCharCode("A", 45)).toBe(65);
    })
    test("Test 2", () => {
        expect(getCharCode("~-", 45)).toBe(126);
    })

})

describe("De Alias", () => {
    test("Test 1", () => {
        let aliased: TAliased = [{
            array: [
                { "-": "1", ".": 9 },
                { "-": "1", ".": 9 },
                { "-": "1", ".": 9 },
            ]
        }, 45, "longName", "OtherLongName"],
            expected = {
                array: [
                    { longName: "1", OtherLongName: 9 },
                    { longName: "1", OtherLongName: 9 },
                    { longName: "1", OtherLongName: 9 },
                ]
            }

        expect(dealias(aliased)).toStrictEqual(expected)
    })

    test("Test 2", () => {
        let aliased: TAliased = [{
            array: [
                {
                    "-": "1", ".": {
                        test: "Yes"
                    }
                },
                { "-": "1", ".": 9 },
                { "-": "1", ".": 9 },
            ]
        }, 45, "longName", "OtherLongName"],
            expected = {
                array: [
                    {
                        longName: "1", OtherLongName: {
                            test: "Yes"
                        }
                    },
                    { longName: "1", OtherLongName: 9 },
                    { longName: "1", OtherLongName: 9 },
                ]
            }

        expect(dealias(aliased)).toStrictEqual(expected)
    })
})