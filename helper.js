
export const fileUploadImage = (files, folder = "users") => {
    // console.log(files, "===================================##@@");
  
    let file_name_string = files.name;
    // console.log(file_name_string, "_____________file name_____________");
    var file_name_array = file_name_string.split(".");
  
    var file_ext = file_name_array[1];
  
    var letters = "ABCDE1234567890FGHJK1234567890MNPQRSTUXY";
    var result = "";
    while (result.length < 28) {
      var rand_int = Math.floor(Math.random() * 19 + 1);
      var rand_chr = letters[rand_int];
      if (result.substr(-1, 1) != rand_chr) result += rand_chr;
    }
    var resultExt = `${folder}/${result}.${file_ext}`;
    files.mv(`public/images/${folder}/${result}.${file_ext}`, function (err) {
      if (err) {
        throw err;
      }
    });
    // console.log(resultExt);
    return resultExt;
  };