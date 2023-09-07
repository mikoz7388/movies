type PersonInfoProps = {
  birthday: string | null;
  place_of_birth: string | null;
  gender: number | null;
};

export function PersonInfo({
  birthday,
  place_of_birth,
  gender,
}: PersonInfoProps) {
  return (
    <>
      <p>
        <span className="font-semibold">Birthday:</span> {birthday || "N/A"}
      </p>
      <p>
        <span className="font-semibold">Place of Birth:</span>{" "}
        {place_of_birth || "N/A"}
      </p>
      <p>
        <span className="font-semibold">Gender:</span>{" "}
        {gender ? (gender === 1 ? "Female" : "Male") : "N/A"}
      </p>
    </>
  );
}
