const expect = require("expect");

const { generateMessage } = require("./message");

describe("generateMessage", () => {
  it("should generate correct message object", () => {
    const from = "Jesse";
    const text = "Marry me";
    const res = generateMessage(from, text);

    expect(res.createdAt).toBeA("number");
    expect(res).toInclude({ from, text });
  });
});
