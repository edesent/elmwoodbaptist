import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { validateConnectCard, hasUnexpectedFields, MAX_NAME_LEN, MAX_CHILDREN } from "../../src/lib/connectCard/validation";

function baseInput(overrides: Record<string, unknown> = {}) {
  return {
    firstName: "Jane",
    lastName: "Doe",
    attendanceStatus: "first_time",
    ...overrides,
  };
}

describe("validateConnectCard", () => {
  test("accepts a valid basic submission", () => {
    const { data, errors } = validateConnectCard(baseInput());
    assert.equal(Object.keys(errors).length, 0);
    assert.ok(data);
    assert.equal(data!.firstName, "Jane");
    assert.equal(data!.attendanceStatus, "first_time");
    assert.equal(data!.email, null);
    assert.equal(data!.children.length, 0);
  });

  test("accepts a submission with all optional fields omitted", () => {
    const { data, errors } = validateConnectCard(baseInput());
    assert.equal(Object.keys(errors).length, 0);
    assert.ok(data);
    assert.equal(data!.phone, null);
    assert.equal(data!.maritalStatus, null);
    assert.equal(data!.ageGroup, null);
  });

  test("accepts a submission with multiple children", () => {
    const { data, errors } = validateConnectCard(
      baseInput({
        children: [
          { firstName: "Timmy", lastName: "Doe", grade: "preschool" },
          { firstName: "Sue", lastName: "", grade: "kindergarten" },
          { firstName: "Alex", lastName: "Doe", grade: "other", gradeOther: "3rd grade" },
        ],
      })
    );
    assert.equal(Object.keys(errors).length, 0);
    assert.equal(data!.children.length, 3);
    assert.equal(data!.children[2].gradeOther, "3rd grade");
  });

  test("rejects an invalid email but keeps other fields valid", () => {
    const { data, errors } = validateConnectCard(baseInput({ email: "not-an-email" }));
    assert.equal(data, null);
    assert.ok(errors.email);
  });

  test("accepts a valid email", () => {
    const { data, errors } = validateConnectCard(baseInput({ email: "visitor@example.com" }));
    assert.equal(Object.keys(errors).length, 0);
    assert.equal(data!.email, "visitor@example.com");
  });

  test("rejects a submission missing required fields", () => {
    const { data, errors } = validateConnectCard({});
    assert.equal(data, null);
    assert.ok(errors.firstName);
    assert.ok(errors.lastName);
    assert.ok(errors.attendanceStatus);
  });

  test("rejects an invalid attendance status", () => {
    const { data, errors } = validateConnectCard(baseInput({ attendanceStatus: "definitely_a_member" }));
    assert.equal(data, null);
    assert.ok(errors.attendanceStatus);
  });

  test("clips overly long text fields instead of erroring", () => {
    const longName = "A".repeat(500);
    const { data } = validateConnectCard(baseInput({ firstName: longName }));
    assert.ok(data);
    assert.equal(data!.firstName.length, MAX_NAME_LEN);
  });

  test("caps the number of children accepted", () => {
    const children = Array.from({ length: MAX_CHILDREN + 5 }, (_, i) => ({
      firstName: `Kid${i}`,
      grade: "nursery",
    }));
    const { errors } = validateConnectCard(baseInput({ children }));
    assert.ok(errors.children);
  });

  test("trims whitespace from names", () => {
    const { data } = validateConnectCard(baseInput({ firstName: "  Jane  ", lastName: "  Doe  " }));
    assert.equal(data!.firstName, "Jane");
    assert.equal(data!.lastName, "Doe");
  });

  test("only includes a prayer request when the interest checkbox is selected", () => {
    const { data } = validateConnectCard(
      baseInput({ interests: ["more_info"], prayerRequest: "Please pray for my family" })
    );
    assert.equal(data!.prayerRequest, null);

    const { data: withInterest } = validateConnectCard(
      baseInput({ interests: ["prayer_request"], prayerRequest: "Please pray for my family" })
    );
    assert.equal(withInterest!.prayerRequest, "Please pray for my family");
  });
});

describe("hasUnexpectedFields", () => {
  test("flags fields outside the known allow-list (mass-assignment guard)", () => {
    const unexpected = hasUnexpectedFields({
      firstName: "Jane",
      isAdmin: true,
      breezePersonId: "12345",
    });
    assert.deepEqual(unexpected.sort(), ["breezePersonId", "isAdmin"]);
  });

  test("allows a normal, fully-populated submission", () => {
    const unexpected = hasUnexpectedFields(baseInput({ email: "a@b.com", children: [] }));
    assert.deepEqual(unexpected, []);
  });
});
