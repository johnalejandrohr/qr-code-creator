qrInput = document.getElementById("message");
qrImg = document.getElementById("qr-code-img");
generateBtn = document.getElementById("generate-qr")
const wrapper = document.querySelector(".qr-code");

let preValue;


generateBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if(validate()) {
        const message = document.getElementById("message").value.trim();

        let qrValue = message
        console.log(qrValue);

        if(!qrValue || preValue === qrValue) return;
        preValue = qrValue;
        generateBtn.innerText = "Generando código QR...";
        qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`;
        
        qrImg.addEventListener("load", () => {
            wrapper.classList.add("qr-code--active");
            generateBtn.innerText = "Generar código QR";
        });

    }
});

qrInput.addEventListener("keyup", () => {
    if(!qrInput.value.trim()) {
        wrapper.classList.remove("qr-code--active");
        preValue = "";
    }
});


function validate() {
    const message = document.getElementById("message").value.trim();

    if(message === "" ) {
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