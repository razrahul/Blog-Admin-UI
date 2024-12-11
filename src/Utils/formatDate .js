
const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  return date.toLocaleString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  });
};



// const UserComponent = ({ user }) => {
//   return (
//     <p>Created At: {formatDate(user.createdAt)}</p>
//   );
// };

export default formatDate;
