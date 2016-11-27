$("#s3CredentialSubmitBtn").click(function(){
  var accessKey = $("#accessKey").val();
  var accessSecretKey = $("#accessSecretKey").val();
  var region = $("#region").val();
  localStorage.setItem("S3Explorer_accessKey", accessKey);
  localStorage.setItem("S3Explorer_accessSecretKey", accessSecretKey);
  localStorage.setItem("S3Explorer_region", region);
});

$(document).ready(function(){
  $("#accessKeyDiv").hide();
  $("#bucketListDiv").hide();

  var accessKey = localStorage.getItem("S3Explorer_accessKey");
  if(accessKey && accessKey!=''){
    $("#bucketListDiv").show();
  }else{
    $("#accessKeyDiv").show();
  }
});

$("#configurationLink").click(function(){
  $("#bucketListDiv").hide();
  $("#accessKeyDiv").show();
});

$("#bucketListLink").click(function(){
  $("#bucketListDiv").show();
  $("#accessKeyDiv").hide();
});

function listBuckets(){
  var accessKey = localStorage.getItem("S3Explorer_accessKey");
  var accessSecretKey = localStorage.getItem("S3Explorer_accessSecretKey");
  var region = localStorage.getItem("S3Explorer_region");

  AWS.config.accessKeyId = accessKey;
  AWS.config.secretAccessKey = accessSecretKey;
  AWS.config.region = region;
  var s3 = new AWS.S3();
  s3.listBuckets(function(err, data) {
  if (err){
    console.log(err, err.stack);
  } else{
    console.log(data);
    $.each(data.Buckets, function(i, bucket) {
                var trElement = $("<tr>");
                var tdElementNum = $("<td>",{text:i+1});
                var tdElementName = $("<td>",{text:bucket.Name});
                var tdElementDate = $("<td>",{text:bucket.CreationDate});
                trElement.append(tdElementNum);
                trElement.append(tdElementName);
                trElement.append(tdElementDate);
                $("#bucketListDiv").find("table").find("tbody").append(trElement);
            });
  }
});
}
