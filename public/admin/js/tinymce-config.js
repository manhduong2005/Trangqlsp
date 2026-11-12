tinymce.init({
  selector: 'textarea.textarea-mce', // hoặc selector cụ thể bạn đang dùng (vd: 'textarea.textarea-mce')
  license_key: 'gpl',   // ✅ Thêm dòng này để dùng miễn phí theo giấy phép mã nguồn mở GPL
  plugins: 'lists link image table code help wordcount',
  // ... giữ nguyên các cấu hình khác của bạn
});