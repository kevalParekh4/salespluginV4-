function pushData(enquiryno, phoneNo,model,firstname,enquirydate) {
    if (enquiryno != null && enquiryno.trim().length > 0 && phoneNo != null && phoneNo.trim().length > 0 && model != null && model.trim().length > 0) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].EnquiryNo == enquiryno)
            	{
                data[i].PhoneNo = phoneNo;
                data[i].Model = model;
                console.log("return");
                return;
            }
        }
        data.push({
            "EnquiryNo": enquiryno,
            "PhoneNo": phoneNo,
            "Model":model,
            "SMSSent": false
        });
        console.log("data added");
        //saveStuff(data);
    }
}