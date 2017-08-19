const expect = require("expect");

const { isRealString } = require("./validation");

describe("isRealString", () => {
  it("should reject non-string values", () => {
    const str = 666;
    const res = isRealString(str);

    expect(res).toBe(false);
  });

  it("should reject string with only spaces", () => {
    const str = "    ";
    const res = isRealString(str);

    expect(res).toBe(false);
  });

  it("should allow string with non-space characters", () => {
    const str = "Stefan";
    const res = isRealString(str);

    expect(res).toBe(true);
  });
});
