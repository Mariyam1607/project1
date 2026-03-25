// modal
//
// const modal = document.querySelector(".modal")
// const openModalBtn = document.querySelector("#btn-get")
// const closeModalBtn = document.querySelector(".modal_close")
//
// const openModal = () => {
//     modal.style.display = "block"
//     document.body.style.overflow = "hidden"
// }
// const closeModal = () =>{
//     modal.style.display = "none"
//     document.body.style.overflow = ""
// }
//
// openModalBtn.onclick = openModal
// closeModalBtn.onclick = closeModal
// modal.onclick = (event) => {
//     if (event.target === modal) {
//         closeModal()
//     }
// }
// setTimeout(openModal, 10000)
//
// const showModalByScroll = () => {
//     const scrollPosition = window.scrollY + window.innerHeight
//     const pageHeight = document.documentElement.scrollHeight
//
//     if (scrollPosition >= pageHeight - 10) {
//         openModal()
//         window.removeEventListener("scroll", showModalByScroll)
//     }
// }
//
// window.addEventListener("scroll", showModalByScroll)