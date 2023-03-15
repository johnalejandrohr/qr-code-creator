qrInput = document.getElementById("message");
qrImg = document.getElementById("qr-code-img");
generateBtn = document.getElementById("generate-qr")
const wrapper = document.querySelector(".qr-code");

let preValue;

console.log(qrImg);


generateBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if(validate()) {
        const code = document.getElementById("code").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const message = document.getElementById("message").value.trim();

        let qrValue = "https://wa.me/"+ code.substring(1) + phone +"?text="+ message.replace(/ /g, "%2B");
        console.log(qrValue);

        if(!qrValue || preValue === qrValue) return;
        preValue = qrValue;
        generateBtn.innerText = "Generando código QR...";
        qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`;
        
        qrImg.addEventListener("load", () => {
            wrapper.classList.add("qr-code--active");
            generateBtn.innerText = "Generar código QR";

            document.getElementById("qrEnlace").innerHTML = qrValue.slice(0, 33)+'...'
            document.getElementById("qrEnlace").href = qrValue

            
        });

    }
});

qrInput.addEventListener("keyup", () => {
    if(!qrInput.value.trim()) {
        wrapper.classList.remove("qr-code--active");
        preValue = "";
        document.getElementById("qrEnlace").innerHTML = ''
    }
});


function validate(params) {
    const code = document.getElementById("code").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();

    if(code === "" || phone === "" || message === "" ) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Asegurate de haber agregado el codigo del pais, telefono y mensaje!',
          })
          return false
    } else {
        return true
    }
}