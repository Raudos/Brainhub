import moment from "moment";

export default timestamp => moment.unix(timestamp).format("YYYY - MM - DD");
