import logoImg from "../../assets/img/logo.png";
import Nav from "./components/Nav";

$("#rootHeader").append(
    <div className="d-flex align-items-center justify-content-between">
        <a className="logo d-flex align-items-center" href="index.html">
            <img src={logoImg}  alt="logo" />
            <span className="d-none d-lg-block">WAH SHOON</span>
        </a>
        <i className="bi bi-list toggle-sidebar-btn"></i>
    </div>,
    <Nav />
)


$(function () {
    $(".toggle-sidebar-btn").on("click", function () {
        $("body").toggleClass("toggle-sidebar");
    })
})