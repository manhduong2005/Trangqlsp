module.exports = (query) => {
  let filterStatus = [
    {
      name: "Tất cả",
      status: "",
      class: ""
    },
    {
      name: "Hoạt động",
      status:"active",
      class: ""
    },
    {
      name: "Dừng hoạt đồng",
      status: "inactive",
      class: ""
    }
  ];

  if(query.status){
    const index = filterStatus.findIndex(item => item.status == query.status);
    filterStatus[index].class = "active";
    
  }else{
    const index = filterStatus.findIndex(item => item.status == "");
    filterStatus[index].class = "active";
  }// gán class active cho button có status trùng với query.status, nếu không có query.status thì gán class active cho button có status là rỗng
  return filterStatus;
}