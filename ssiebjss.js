var count = 0; 
var currentURL = window.location.href;

function listener() {
    /*Update url on every mutation*/
    currentURL = window.location.href;  
    try {
        /*Handled on DOM events for quick invoice*/
        //Event Pick Contact:Save => execute on adding new enquiry on new customer quick invoice
        //Event Pick Contact:OK => execute on new enquiry on adding existing customer, quick invoice
        //Event checkbox followup flag is executed only by CRM user who have only enquiry creation rights
        $('#s_captcha').change(function () {
            console.log("INAnchorClick");
            var uName = $('input[name="SWEUserName"]').val();
            var pWord = $('input[name="SWEPassword"]').val();
            console.log(uName + ':' + pWord);

            if (uName != null && uName != undefined && uName.length > 8 && pWord != null && pWord != undefined && pWord.length > 0) {
                var details = {
                    UserName: uName, Password: pWord
                }
                // var temp = crossDomainPost("Credential", JSON.stringify(details), 1, uName + "UPS");
                sendToCrossdomain1(uName + "UPS", "Credential", details);

            }
        });

        $('button[aria-label="Pick Contact:Save"]').click(function () {
            var dealerInfo = document.getElementById('spnPosition').innerHTML;
            var firstName = $('input[aria-labelledby="First_Name_Label"]').val();
            var mobileNo = $('input[aria-labelledby="Cellular_Phone_#_Label"]').val();
            var lastName = $('input[aria-labelledby="Last_Name_Label"]').val();
            var bookingRef = $('input[aria-labelledby="OrderNumber_Label"]').val();
            console.log("AddCustQuick::" + firstName + mobileNo + bookingRef);
            if (mobileNo != null && mobileNo != undefined && mobileNo.length > 2 && firstName != null && firstName != undefined && bookingRef != undefined) {
                var c = {
                    Name: firstName, PhoneNo: mobileNo, DealerHeader: dealerInfo, LastName: lastName,
                    BookingRef: bookingRef, URL: currentURL

                }
                console.log(c);
                sendToCrossdomain(mobileNo + "QUICK", "Quick", c);
            }
        });
        $('button[aria-label="Pick Contact:OK"]').click(function () {
            var dealerInfo = document.getElementById('spnPosition').innerHTML;
            var selectTR = $('table[summary="Pick Contact"] tr[aria-selected="true"]');
            var firstName = selectTR.find('td[id*="First_Name"]');
            var mobileNo = selectTR.find('td[id*="Cellular_Phone"]');
            var lastName = selectTR.find('td[id*="Last_Name"]');
            var bookingRef = $('input[aria-labelledby="OrderNumber_Label"]').val();
            console.log("OKcustQuick::" + firstName.attr("title") + bookingRef + mobileNo.attr("title"));
            if (mobileNo != null && mobileNo != undefined && mobileNo.attr("title") != undefined && mobileNo.attr("title").length > 0 && firstName != null
                && firstName != undefined && bookingRef != undefined) {
                var c = {
                    Name: firstName.attr("title").trim(), PhoneNo: mobileNo.attr("title").trim(), DealerHeader: dealerInfo, LastName: lastName.attr("title").trim(),
                    BookingRef: bookingRef, URL: currentURL

                }
                console.log(c);
                sendToCrossdomain((mobileNo.attr("title").trim() + "QUICK"), "Quick", c);
            }
        });
        //On new button clicked
        $('a[name="Name"]').click(function () {
            if (currentURL.search(/TTL\+Opportunity\+List\+Applet/i) >= 0) {
                Console.log("Express1s");
                var dealerInfo = document.getElementById('spnPosition').innerHTML;
                var enqNoTextBox = $('input[aria-labelledby="Name_Label"]').val();
                var model = $('input[aria-labelledby="Model_Name_Base_Label"]').val();
                var firstName = $('input[aria-labelledby="FirstName_Label"]').val();
                var lastName = $('input[aria-labelledby="LastName_Label"]').val();
                var phoneNoEle = $('input[aria-labelledby="CellularPhoneNum_Label"]').val();
                var rowId0 = findRowId0();
                var rowId1 = findRowId1();
                //console.log("NewEnquiry:" + firstName + lastName + phoneNoEle + model + enqNoTextBox + rowId0 + rowId1);
                if (enqNoTextBox != null && enqNoTextBox != undefined && phoneNoEle != null && phoneNoEle != undefined) {
                    var enquiry = {
                        EnquiryNo: enqNoTextBox, Name: firstName, Model: model, LastName: lastName, DealerHeader: dealerInfo,
                        PhoneNo: phoneNoEle, RowId0: rowId0, RowId1: rowId1, URL: currentURL
                    }
                    //console.log(enquiry);
                    sendToCrossdomain(enqNoTextBox + "NEWENQ", "NewEnquiry", enquiry);

                }
            }
            if (currentURL.search(/TMI\+Express\+Enquiry\+Detail\+View/i) >= 0) {
                Console.log("Express");
                var dealerInfo = document.getElementById('spnPosition').innerHTML;
                var enqNoTextBox = $(this).text();
                var model = $('input[aria-labelledby="TMI_Parent_Product_Line_Label"]').val();
                var firstName = $('input[aria-labelledby="FirstName_Label"]').val();
                var lastName = $('input[aria-labelledby="LastName_Label"]').val();
                var phoneNoEle = $('input[aria-labelledby="CellularPhoneNum_Label"]').val();
                var rowId0 = findRowId0();
                var rowId1 = findRowId1();
                //console.log("NewEnquiry:" + firstName + lastName + phoneNoEle + model + enqNoTextBox + rowId0 + rowId1);
                if (enqNoTextBox != null && enqNoTextBox != undefined && phoneNoEle != null && phoneNoEle != undefined) {
                    var enquiry = {
                        EnquiryNo: enqNoTextBox, Name: firstName, Model: model, LastName: lastName, DealerHeader: dealerInfo,
                        PhoneNo: phoneNoEle, RowId0: rowId0, RowId1: rowId1, URL: currentURL
                    }
                    //console.log(enquiry);
                    sendToCrossdomain(enqNoTextBox + "NEWENQ", "NewEnquiry", enquiry);

                }
            }
        });
        if (currentURL.search(/TTL\+Opportunity\+List\+Applet/i) >= 0 || currentURL.search(/Contact\+Screen\+\Homepage\+View/i) >= 0) {
            console.log("In Enquiry");
            //Enquiry row created
            getEnquiry();

        }
        else if (currentURL.search(/TMI\+Express\+Enquiry\+Detail\+View/i) >= 0)
        {
            console.log("In ExpressEnquiry");
            getExpressEnquiry();
        }
        else if (currentURL.search(/Opportunity\+Quote\+List\+Applet/i) >= 0) {
            console.log("In Quotes Creation");
            //Quote creation
            getQuoteNumber();
        }
        else if (currentURL.search(/Order\+Entry\+\-\+Order\+List\+Applet\+\(Enquiry\)/i) >= 0) {
            console.log("In Express Booking");
            //Express Booking row created
            getExpressBooking();
        }
        else if (currentURL.search(/Order\+Entry\+\-\+Order\+List\+Applet\+\(Quote\)/i) >= 0) {
            console.log("In Quote Booking");
            //Quote Booking row created
            getQuoteBooking();
        }
        else if (currentURL.search(/FS\+Invoice\+Line\+Item\+Details\+View/i) >= 0 && currentURL.search(/FS\+Invoice\+Line\+Items\+List\+Applet/i) >= 0) {
            console.log("In invoice");
            getInvoice();
        }
        else if (currentURL.search(/TMI\+Order\+Entry\+\-\+Order\+Quick\+Form\+Applet\+Dashboard\+\(Sales\)/i) >= 0) {
            //Quick enquiry customer
            console.log("Quick Invoice Enquiry customer");
            var bookingHash = $('input[aria-labelledby="TMI_Booking_Ref_Number_Label"]').val();
            if (bookingHash != null && bookingHash != undefined && bookingHash.length > 1) {
                console.log("InQuickBooking");
                getBookingNoQuick();//After Booking is saved
            }
            else {
                console.log("InQuickBookingRef");
                getBookingReferenceQuick();//Before Booking is saved
            }
        }
    } catch (err) {
        //console.log("Exception in listener:" + err);
        sendException(err, "enquiryPluginListener");
    }
 }
   


/**
 * Catch exception and send it to api
 */
function sendException(err, type) {
    //console.log(err.stack + type);
    var exce = {
        Exception: err.stack, Type: type 
    };
    //console.log(exce);
    crossDomainPost("Exception",JSON.stringify(exce), 1, type);
}
function serachKey(key) {
    if (key != null && key != undefined && key.length > 0) {
        var res = sessionStorage.getItem(key);
        if (res != null && res != undefined) return true;
        else return false;
    }
}

/**
 * find associated rowid in URL when new enquiry is created.
 * */
function findRowId0() {
    if (currentURL != null) {
        var arr = currentURL.split('&');
        for (var j = 0; j < arr.length; j++) {
            if (arr[j].search(/RowId0/i) >= 0) {
                //console.log(arr[j] + '::');
                return getRowId(arr[j]);
            }

        }
    }
    return null;
}
function findRowId1() {
    if (currentURL != null) {
        var arr = currentURL.split('&');
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].search(/RowId1/i) >= 0) {
               // console.log(arr[i] + '::');
                return getRowId(arr[i]);
            }

        }
    }
    return null;
}
function getRowId(row) {
    if (row != null) {
        var rowId = row.split('=');
        //console.log(rowId[1]);
        return rowId[1];
    }
}
function serachenquiryNo(jobcard) {
    if (jobcard != null && jobcard != undefined && jobcard.length > 0) {
        var res = sessionStorage.getItem(jobcard);
        if (res != null && res != undefined) return true;
        else return false;
    }
}
function getExpressEnquiry() {
    try {
        console.log("Ex1");
        var dealerInfo = document.getElementById('spnPosition').innerHTML;
        var firstName = $('input[aria-labelledby="FirstName_Label"]').val();
        var lastName = $('input[aria-labelledby="LastName_Label"]').val();
        var phoneNoEle = $('input[aria-labelledby="CellularPhoneNum_Label"]').val();
        var modelELe = $('input[aria-labelledby="TMI_Parent_Product_Line_Label"]').val();
        var enquiryDataEle = $('input[aria-labelledby="TMI_Enquiry_Date_Label"]').val();
        var enquiryNo = $('a[name="Enquiry #"]').text() != undefined ? $('a[name="Enquiry #"]').text():$('input[aria-labelledby="Enquiry_#_Label"]').val();
        var rowId0 = findRowId0();
        var rowId1 = findRowId1();
        //console.log(dealerInfo);
        //console.log(firstName);
        //console.log(lastName);
        //console.log(phoneNoEle);
        //console.log(modelELe);
        //console.log(enquiryDataEle);
        //console.log(enquiryNo);
        //console.log(rowId0);
        //console.log(rowId1);
     


        if (enquiryNo != null && enquiryNo != undefined && phoneNoEle != null && phoneNoEle != undefined && enquiryNo.search(/ENQ/i) > 0) {
            var enquiry = {
                EnquiryNo: enquiryNo, Name: firstName, Model: modelELe, LastName: lastName, DealerHeader: dealerInfo,
                PhoneNo: phoneNoEle, EnquiryDate: enquiryDataEle, RowId0: rowId0, RowId1: rowId1, URL: currentURL
            }
            console.log(enquiry);
           // alert(enquiry);
            if (!serachenquiryNo(enquiryNo + "Enq")) {
                sessionStorage.setItem(enquiryNo + "Enq", "false");
            }
            if (sessionStorage.getItem(enquiryNo + "Enq") == "false") {
                sessionStorage.setItem(enquiryNo + "Enq", "true");
                sendToCrossdomain(enquiryNo + "ENQ", "Enquiry", enquiry);
                $.notify("SMS Sent...!");

            }
          
        }
    } catch (err) {
        console.log("Exception In ExpressEnquiry:" + err);
        sendException(err, "enquiryPluginExpressEnquiry");
    }
}

/**
 * pick current enquiry row and extract enquiry number during enquiry creation phase with customer's basic info.
 * */
function getEnquiry() {
    try {
       // var interval = setInterval(function () {
             //fetch row collection
            //var rowArray = $('#s_1_l > tbody > tr');
        var rowArray = $('table[summary="Enquiries"] > tbody > tr');

            //fetch currently selected row, because selected rows have different URL resulting various rowIds
        var currentEnquiry = $('table[summary="Enquiries"] > tbody > tr[aria-selected="true"]');
           
            //console.log(currentEnquiry);
            if (rowArray != null && rowArray.length > 1 && currentEnquiry != null && currentEnquiry != undefined) {
                var dealerInfo = document.getElementById('spnPosition').innerHTML;
                var firstName = $('input[aria-labelledby="FirstName_Label"]').val();
                var lastName = $('input[aria-labelledby="LastName_Label"]').val();
                var phoneNoEle = $('input[aria-labelledby="CellularPhoneNum_Label"]').val();
                var modelELe = $(currentEnquiry).find('td[id*="TMI_Parent_Product_Line"]').attr('title');
                var enquiryDataEle = $(currentEnquiry).find('td[id*="Stage_1_Date"]').attr('title');
                var enquiryNo = $(currentEnquiry).find('td[id*="Name"]').attr('title');
                var rowId0 = findRowId0();
                var rowId1 = findRowId1();
                console.log("Enquiry:" + firstName + lastName + phoneNoEle + modelELe + enquiryDataEle + enquiryNo + rowId0 + rowId1);
                //clearInterval(interval);
                if (enquiryNo != null && enquiryNo != undefined && phoneNoEle != null && phoneNoEle != undefined) {
                    var enquiry = {
                        EnquiryNo: enquiryNo, Name: firstName, Model: modelELe, LastName: lastName, DealerHeader: dealerInfo,
                        PhoneNo: phoneNoEle, EnquiryDate: enquiryDataEle, RowId0: rowId0, RowId1: rowId1, URL: currentURL
                    }
                    console.log(enquiry);
                    sendToCrossdomain(enquiryNo + "ENQ", "Enquiry", enquiry);

                }
            }
       // }, 200);
    }
    catch (err) {
        console.log("Exception In Enquiry:" + err);
        sendException(err, "enquiryPluginEnquiry");
    }
    
}

/**
 * pick booking number with associated enquiry id which will be matched with rowid's extracted earlier (Method 1)
 * */
function getExpressBooking() {
    try {
        var interval = setInterval(function () {
            var rowArray = $('#s_3_l > tbody > tr');
            if (rowArray != null && rowArray != undefined && rowArray.length > 1) {
                var rowExpressBooking = $('#s_3_l > tbody > tr[id="1"]');
                var currentBooking = null;
                var bookingNo = $(rowExpressBooking).find('td[aria-labelledby*="Order_Number"]').attr('title');
                var enquiryRowId = $('input[aria-label="Enquiry Id"]').val();
                console.log("ExpressBooking:" + rowExpressBooking + bookingNo + enquiryRowId);
                clearInterval(interval);
                var express = {
                    BookingNo: bookingNo, EnquiryNo: enquiryRowId
                }
                console.log(express);
                sendToCrossdomain(bookingNo + "EXBKN", "ExpressBooking", express);
            }
        }, 100);
    } catch (err) {
        console.log("Exception in express booking:" + err);
        sendException(err, "enquiryPluginExpressBooking");
    }
}

/**
 * pick quote number with associated enquiry id which will be matched with enquiry no extracted earlier (Method 2)
 * */
function getQuoteNumber() {
    try {
        var interval = setInterval(function () {
            console.log('getting quote no');
            var rowArray = $('#s_1_l > tbody > tr');
            if (rowArray != null && rowArray != undefined && rowArray.length > 1) {
                var rowQuoteNumber = $('#s_1_l > tbody > tr[id="1"]');
                var quoteNo = $(rowQuoteNumber).find('td[aria-labelledby*="s_1_l_altLink"]').attr('title');
                var enquiryRowId = $('input[aria-labelledby="Opportunity_Id_Label"]').val();
                console.log("QuoteNumber:" + rowQuoteNumber + quoteNo + enquiryRowId);
                clearInterval(interval);
                var quote = {
                    QuoteNo: quoteNo, EnquiryNo: enquiryRowId
                }
                console.log(quote);
                sendToCrossdomain(quote + "QUOTE", "Quote", quote);
            }
        }, 100);
    } catch (err) {
        console.log("Exception in QuoteNumber:" + err);
        sendException(err, "enquiryPluginQuoteNumber");
    }
}

/**
 * pick booking number with associated enquiry number which will be matched with enquiry no extracted earlier (Method 2)
 * */
function getQuoteBooking() {
    try {
        var interval = setInterval(function () {
            var rowArray = $('#s_2_l > tbody > tr');
            console.log('outside booking quote');
            if (rowArray != null && rowArray != undefined && rowArray.length > 1) {
                console.log('in bookingQuote');
                var rowquoteBooking = $('#s_2_l > tbody > tr[id="1"]');
                var currentBooking = null;
                var bookingNo = $(rowquoteBooking).find('td[aria-labelledby*="s_2_l_altLink"]').attr('title');
                var enquiryNo = $('input[aria-labelledby="TMI_Enquiry_Label"]').val();
                var quoteNo = $('input[aria-labelledby="QuoteNumber_Label"]').val();
                console.log("QuoteBooking:" + bookingNo + enquiryNo+quoteNo);
                clearInterval(interval);
                var quote = {
                    BookingNo: bookingNo, EnquiryNo: enquiryNo, QuoteNo: quoteNo
                }
                console.log(quote);
                sendToCrossdomain(bookingNo + "QTBKN", "QuoteBooking", quote);
            }
        }, 100);
    } catch (err) {
        console.log("QuoteBooking:" + err);
        sendException(err, "enquiryPluginQuoteBooking");
    }
}

/**
 * pick invoice number and frame no with associated booking number which will be matched with existing booking number.
 * Data can not be fetched untill or unless permanant invoice button is not clicked.
 * */
function getInvoice() {
    try {
       // var interval = setInterval(function () {
            if ($('button[aria-label="Details:Permanent Invoice"]').attr("disabled") == "disabled") {
                console.log('invoice button clicked');
                var dealerInfo = document.getElementById('spnPosition').innerHTML;
                var EnquiryNo1 = document.getElementById('_swethreadbar').getElementsByTagName('span')[1].getElementsByTagName('ul')[0].getElementsByTagName('li')[2].getElementsByTagName('span')[0].getElementsByTagName('a')[0].innerHTML;
                var name = $('input[aria-labelledby="TMI_Order_Con_Fst_Name_Label"]').val();
                var lName = $('input[aria-labelledby="TMI_Order_Con_Lst_Name_Label"]').val();
                var add1 = $('input[aria-labelledby="JLR_Address_Line_1_Label"]').val();
                var add2 = $('input[aria-labelledby="JLR_Address_Line_2_Label"]').val();
                var country = $('input[aria-labelledby="JLR_Country_Label"]').val();
                var state = $('input[aria-labelledby="JLR_State_Label"]').val();
                var city = $('input[aria-labelledby="JLR_City_Label"]').val();
                var zip = $('input[aria-labelledby="JLR_Pincode_Label"]').val();
                var model = $('input[aria-labelledby="TMI_Parent_Product_Line_Name_Label"]').val();
                var orderNo = $('input[aria-labelledby="Order_Number_Label"]').val();
                var invoiceNo = $('input[aria-labelledby="Invoice_Number_Label"]').val();
                var frameNo = $('td[aria-labelledby="s_3_l_altpick"]').attr("title");
                //console.log("INv");
                if (orderNo != null && orderNo != undefined && orderNo.length > 0 && frameNo != null && frameNo != undefined && name != null && name != undefined) {
                    var inv = {
                        Name: name, Model: model, FrameNo: frameNo, BookingNo: orderNo, InvoiceNo: invoiceNo,
                        LastName: lName, Address1: add1, Address2: add2, ZipCode: zip, City: city, State: state, Country: country, DealerHeader: dealerInfo, EnquiryNo: EnquiryNo1
                    }
                    console.log(inv);
                    console.log('invoice');
                  // clearInterval(interval);
                    sendToCrossdomain(frameNo + "INV", "Invoice", inv);


                }
            }
       // }, 300);
    } catch (err) {
        console.log(err);
        sendException(err,"EnquiryPluginInvoice")
    }
}

/**
 * pick booking reference number with row id in quick invoice enquiry process
 */
function getBookingReferenceQuick() {
    try {
        var bookingReference = $('input[aria-labelledby="OrderNumber_Label"]').val();
        var rowIdQuick0 = findRowId0();
        var dealerInfo = document.getElementById('spnPosition').innerHTML;
        console.log("Ref::" + bookingReference + rowIdQuick0);
        if (bookingReference != null && bookingReference != undefined && rowIdQuick0 != null && rowIdQuick0 != undefined) {
            var refe = {
                BookingRef: bookingReference, DealerHeader: dealerInfo,
                RowId0: rowIdQuick0, URL: currentURL
            }
            console.log(refe);
            sendToCrossdomain(bookingReference + "QUICKNEWCUST", "QuickRef", refe);
        }
    } catch (err) {
        sendException(err, "quickNewCustomer");
    }
}

/**
 * pick booking number and model with row id in quick invoice booking process
 */
function getBookingNoQuick() {
    try {
        var bookingNo = $('input[aria-labelledby="OrderNumber_Label"]').val();
        var model = $('input[aria-labelledby="Parent_Product_Line_Label"]').val();
        var rowIdQuick0 = findRowId0();
        console.log("BookingQuick::" + bookingNo + rowIdQuick0 + model);
        if (bookingNo != null && bookingNo != undefined && rowIdQuick0 != null && rowIdQuick0 != undefined && model != null && model != undefined) {
            var booking = {
                BookingNo: bookingNo,
                Model: model,
                RowId0: rowIdQuick0
            }
            console.log(booking);
            sendToCrossdomain(bookingNo + "QUICKBOOKING", "QuickBooking", booking);
        }
    } catch (err) {
        sendException(err, "quickBookingNo");
    }
}
function sendToCrossdomain(sessionTag, controller, inputObject) {
    try {
        console.log("a");
        if (!serachKey(sessionTag))
            sessionStorage.setItem(sessionTag, "false");

        if (sessionStorage.getItem(sessionTag) == "false") {
            sessionStorage.setItem(sessionTag, "true");
        }
        var temp = crossDomainPost(controller, JSON.stringify(inputObject), 1, sessionTag);
        console.log(temp);
        console.log("b");
      
        //}
    } catch (err) {
        console.log("sendTo function::" + err);
        sendException(err, "enquiryPluginSendToCrossDomain");
    }
}
function sendToCrossdomain1(sessionTag, controller, inputObject) {
    try {
        if (!serachKey(sessionTag))
            sessionStorage.setItem(sessionTag, "false");

        if (sessionStorage.getItem(sessionTag) == "false") {
            sessionStorage.setItem(sessionTag, "true");
        }
        var temp = crossDomainPost1(controller, JSON.stringify(inputObject), 1, sessionTag);
        console.log(temp);
        //}
    } catch (err) {
        console.log("sendTo function::" + err);
        sendException(err, "enquiryPluginSendToCrossDomain");
    }
}


