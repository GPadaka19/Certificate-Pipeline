function sendEmails() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var startRow = 2;  // Baris awal untuk data
    var data = sheet.getDataRange().getValues();
    
    for (var i = startRow - 1; i < data.length; i++) {
        var row = data[i];
        var cohort = row[0];       // Mengambil nama kelompok
        var fullName = row[1];     // Mengambil nama lengkap
        var email = row[2];        // Mengambil alamat email
        var link = row[3];         // Mengambil link
        var type = row[4];         // Mengambil tipe (Piagam/Sertifikat)
        var bcc = row[5];          // Mengambil alamat email BCC

        // Validasi email
        if (!email || !validateEmail(email)) {
            Logger.log("Invalid email: " + email);
            continue; // Skip jika email tidak valid
        }

        var subject = "[" + type + "] Lomba Micro Influencer Competition Gerakan Sekolah Sehat 2024";
        var message;

        // Membuat pesan yang berbeda berdasarkan tipe
        if (type === "Piagam") {
            message = "<p>Yth. <strong>" + fullName + "</strong> dari <strong>" + cohort + "</strong>,</p>" +
                      "<p>Selamat atas pencapaian Anda sebagai pemenang dalam Lomba Micro Influencer Competition Gerakan Sekolah Sehat Tahun 2024! Kami sangat menghargai dedikasi dan kreativitas Anda.</p>" +
                      "<p>Sebagai bentuk penghargaan, kami melampirkan tautan untuk mengunduh Piagam penghargaan melalui Google Drive:</p>" +
                      "<p><strong>" + link + "</strong></p>" +
                      "<p>Kami berharap piagam ini dapat menjadi pengingat kontribusi Anda dalam mendukung program Gerakan Sekolah Sehat. Jika ada pertanyaan, jangan ragu untuk menghubungi kami.</p>" +
                      "<p>Sekali lagi, selamat dan terima kasih atas partisipasi Anda.</p>" +
                      "<p>--<br>Best Regards,<br>Gusti Padaka<br>Master Trainer<br>Yayasan Sagasitas Indonesia</p>";
        } else if (type === "Sertifikat") {
            message = "<p>Yth. <strong>" + fullName + "</strong> dari <strong>" + cohort + "</strong>,</p>" +
                      "<p>Terima kasih atas partisipasi Anda dalam Lomba Micro Influencer Competition Gerakan Sekolah Sehat Tahun 2024. Meskipun tidak berhasil meraih juara, kami sangat menghargai usaha Anda.</p>" +
                      "<p>Sebagai bentuk penghargaan, kami melampirkan tautan untuk mengunduh Sertifikat penghargaan melalui Google Drive:</p>" +
                      "<p><strong>" + link + "</strong></p>" +
                      "<p>Kami berharap sertifikat ini menjadi pengingat upaya Anda dalam mendukung program Gerakan Sekolah Sehat. Jika ada pertanyaan, jangan ragu untuk menghubungi kami.</p>" +
                      "<p>Sekali lagi, terima kasih atas partisipasi Anda.</p>" +
                      "<p>--<br>Best Regards,<br>Gusti Padaka<br>Master Trainer<br>Yayasan Sagasitas Indonesia</p>";
        }

        // Mengirim email dengan BCC jika ada
        MailApp.sendEmail({
            to: email,
            bcc: bcc,  
            subject: subject,
            htmlBody: message  
        });
    }
}

// Fungsi untuk memvalidasi format email
function validateEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}