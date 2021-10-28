const easyTimeFormat = (dateString) => {
    let date = dateString ? new Date(dateString) : new Date();

    let month = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let time = date.toLocaleString("en-GB", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return {
        "time": time,
        "day": date.getDate(),
        "month": month[date.getMonth()],
        "monthTrim": month[date.getMonth()].substring(0,3),
        "year": date.getFullYear(),
        "yearTrim": date.getFullYear().toString().substr(2,2)
    }
}

export default easyTimeFormat
