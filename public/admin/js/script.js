//Button status(filter status)
const buttonStatus = document.querySelectorAll("[button-status]");// lấy ra tất cả các button có thuộc tính button-status
if(buttonStatus.length > 0){
let url = new URL(window.location.href);// lấy ra url hiện tại của trang web


  buttonStatus.forEach(button => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");// lấy ra giá trị của thuộc tính button-status của button được click
      
      if(status){
        url.searchParams.set("status", status);
      }else{
        url.searchParams.delete("status");
      }
      
    
      window.location.href = url.href;// chuyển hướng đến url mới với query string được cập nhật
    });
  } );
}
// End Button status (filter status)
// Form Search
const formSearch = document.querySelector("#form-search");// tìm thấy form có id là form-search
if(formSearch){
  let url = new URL(window.location.href);// lấy ra url hiện tại của trang web
  formSearch.addEventListener("submit", (e) => {// lắng nghe sự kiện submit của form
    e.preventDefault();// ngăn chặn hành vi mặc định của form là gửi dữ liệu và tải lại trang, để có thể kết hợp thêm việc tiềm kiếm bằng nhiều trạng thái khác nhau, ví dụ: trạng thái active, inactive, tất cả, keyword, page
    const keyword = e.target.elements.keyword.value// lấy ra giá trị của input có thuộc tính  name là keyword trong form
  
    if(keyword){
      url.searchParams.set("keyword", keyword);// nếu có giá trị keyword thì thêm vào query string của url
    }else{
      url.searchParams.delete("keyword");// nếu không có giá trị keyword thì xóa luôn keyword trong query string của url
    }
    window.location.href = url.href;// thêm keyword vào query string của url và chuyển hướng đến url mới
  });
}
//End form search


//Pagination
const buttonPagination = document.querySelectorAll("[button-pagination]");
if(buttonPagination){
  let url = new URL(window.location.href)

  buttonPagination.forEach(button => {
    button.addEventListener("click", () => {
      const page = button.getAttribute("button-pagination");

      url.searchParams.set("page", page);

      window.location.href = url.href;
      
    })
  })
}

//end Pagination

//Checkbox multi
const checkboxMulti = document.querySelector("[checkbox-multi]");
if(checkboxMulti){
  const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
  const inputsId = checkboxMulti.querySelectorAll("input[name='id']");
  
  inputCheckAll.addEventListener("click", () => {
    if(inputCheckAll.checked){
      inputsId.forEach(input => {
        input.checked = true;
      });
    }else{
      inputsId.forEach(input => {
        input.checked = false;
      });
    }
  });
}



//End Checkbox multi

// Xử lý Form Change Multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault();

    const checkboxMulti = document.querySelector("[checkbox-multi]");
    const inputsChecked = checkboxMulti.querySelectorAll(
      "input[name='id']:checked"
    );

    const typeChange = e.target.elements.type.value;

    if(typeChange == "delete-all"){
      const  isConfirm = confirm("Bạn có chắc chắn muốn xoá những sản phẩm này?");

      if(!isConfirm){
        return;
      }

    }

    if (inputsChecked.length > 0) {
      let ids = [];
      const inputIds = formChangeMulti.querySelector("input[name='ids']");

      inputsChecked.forEach((input) => {
        const id = input.value;
        if(typeChange == "change-position"){
          const position = input.closest("tr").querySelector("input[name='position']").value;
          ids.push(`${id}-${position}`);
        }else{
          ids.push(id);
        }
      });

      inputIds.value = ids.join(", ");
      formChangeMulti.submit();
    } else {
      alert("Vui lòng chọn ít nhất một bản ghi!");
    }
  });
}
//end form change multi

//Show alert
const showAlert = document.querySelector("[show-alert]");
if(showAlert){
  const time = parseInt(showAlert.getAttribute("data-time"));
  const closeAlert = showAlert.querySelector("[close-alert");

  setTimeout(() => {
    showAlert.classList.add("alert-hidden");//thêm thuộc tính để thêm css cho thuộc tính alert-hidden
  }, time);

  closeAlert.addEventListener("click", () => {
    showAlert.classList.add("alert-hidden")
  });
}

//End show alert

//Upload Image prieview

const uploadImage = document.querySelector("[upload-image]");
if(uploadImage) {
  const uploadImageInput = document.querySelector("[upload-image-input]");
  const uploadImagePreview = document.querySelector("[upload-image-preview]");

  uploadImageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if(file){
      uploadImagePreview.src = URL.createObjectURL(file);
    }
  })

}

//End upload Image preview 
