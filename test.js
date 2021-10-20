const filtered = [{
    id: "12",
    status: "asd",
    tm: "00:09:30", 
    ts: "2021-08-03T23:15:33.008Z"
}, {
    id: "23",
    status: "kji",
    tm: "00:33:99",
    ts: "2021-08-05T23:15:33.008Z"
}, {
    id: "34",
    status: "po",
    tm: "00:11:33",
    ts: "2021-08-07T23:15:33.008Z"
}, {
    id: "12",
    status: "lpl",
    tm: "00:22:11",
    ts: "2021-08-09T23:15:33.008Z"
}]

let newArr = [], grouped = []
const abc = async() => {
    const cDate = new Date();
    filtered.map((ftl) => {
        const tlDate = new Date(ftl.ts)
        if(tlDate.getMonth() == cDate.getMonth()-1) {
            let a = ftl.tm.split(':')
            ftl.tm = ((+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]))/60
            newArr.push(ftl)
        }
    })
    newArr.forEach(function (hash) {
        return function (o) {
            if (!hash[o.id]) {
                hash[o.id] = { id: o.id, tm: 0 };
                grouped.push(hash[o.id]);
            }
            hash[o.id].tm += +o.tm;
        };
    }(Object.create(null)));
    console.log("22", grouped)
   grouped.forEach((ele) => {
       const careType = await patientFileCareTypeModel.query('careType').where("patinetId", ele.id)//retreive only caretype from caretype table
       let statusAndCode = calculateStatus(careType, ele.tm)
        await invoiceModel.query().insert({
            totalMinutes: ele.tm,
            billingStatus: statusAndCode[0],
            patientId: ele.id,
            cptCode: statusAndCode[1]
        })
   })
}

function calculateStatus(ct, time) {
    if(ct == 'encourage' || ct == 'empower' || ct == 'relapsePrevention') {
        if(time >= 20) {
            return ["Eligible", "99484"]
        }
        else return ["Not eligible"]
    } else if(ct == 'embrace') {
        if(ct >= 86) {
            return ["eligible", "99494"]
        } else if(ct>=36 && ct < 86) {
            return ["eligible", "99492"]
        } else if(ct>=15 && ct < 36) {
            return ["eligible", "G2214"]
        }
        else return ["Not eligible"]
    }
    //for month 2 logic is pending
}

abc()