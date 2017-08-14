const expect = require("expect");

const { generateMessage, generateLocationMessage } = require("./message");

describe("generateMessage", () => {
  it("should generate correct message object", () => {
    const from = "Jesse";
    const text = "Marry me";
    const res = generateMessage(from, text);

    expect(res.createdAt).toBeA("number");
    expect(res).toInclude({ from, text });
  });
});

describe("generateLocationMessage", () => {
  it("should generate correct location object", () => {
    const from = "Admin"
    const lat = "24.9766175"
    const lng = "121.2338661"
    const res = generateLocationMessage(from, lat, lng);

    expect(res.createdAt).toBeA("number");
    expect(res.url).toBe(`https://www.google.com/maps?q=${lat},${lng}`)
  });
});
