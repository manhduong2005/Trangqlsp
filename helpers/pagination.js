module.exports = (objectPagination, query, countProducts) => {
  if(query.page){
    objectPagination.currentPage = parseInt(query.page);// chuyển đổi giá trị page trong query string từ string sang number và gán vào currentPage của objectPagination

  }
  objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems// tính toán skip để bỏ qua các bản ghi trước đó, ví dụ: nếu currentPage = 2 và limitItems = 4 thì skip = (2-1)*4 = 4, nghĩa là bỏ qua 4 bản ghi đầu tiên và lấy 4 bản ghi tiếp theo
  
  
  
  const totalPage = Math.ceil(countProducts/objectPagination.limitItems)// tính toán tổng số trang sp thoả mãn điều kiện tìm kiếm
  objectPagination.totalPage = totalPage;// gán thêm trường totalPage vào objectPagination để biết tổng số trang sp thoả mãn điều kiện tìm kiếm
  return objectPagination

}
