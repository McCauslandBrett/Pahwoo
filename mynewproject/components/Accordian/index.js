import { setMode, setTheme } from "../../actions/user.js";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Accordian from "./accordian";

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setMode, setTheme }, dispatch);
};
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Accordian);
