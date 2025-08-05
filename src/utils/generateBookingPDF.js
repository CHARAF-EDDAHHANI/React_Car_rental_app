import { PictureAsPdf } from '@mui/icons-material';
import { jsPDF } from 'jspdf';

/**
 * Generate and download a PDF booking ticket.
 * @param {Object} data - Order ticket data.
 * @param {Array} ticketList - Key-label-value list of items.
 */
 const generateBookingPDF = (data, ticketList) => {
  const {
    orderId
  } = data;

  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const logoUrl = '/images/loca-logo.png';

  fetch(logoUrl)
    .then(res => res.blob())
    .then(blob => {
      const reader = new FileReader();
      reader.onload = () => {
        doc.addImage(reader.result, 'PNG', pageWidth - 50, 10, 40, 20);
        doc.setFontSize(20);
        doc.setTextColor(40, 70, 90);
        doc.text('L O C A Booking Confirmation Ticket', 20, 25);

        let y = 40;
        ticketList.forEach(item => {
          doc.setFillColor(240, 240, 240);
          doc.rect(20, y, 170, 10, 'F');
          doc.setFontSize(12);
          doc.setTextColor(60, 60, 60);
          doc.text(`${item.label}:`, 22, y + 7);
          doc.setTextColor(20, 20, 20);
          doc.text(`${item.value}`, 80, y + 7);
          doc.setDrawColor(220, 220, 220);
          doc.line(20, y + 11, 190, y + 11);
          y += 15;
        });

        doc.save(`Loca_Car_Booking_Ticket_${orderId}.pdf`);
      };
      reader.readAsDataURL(blob);
    })
    .catch(err => {
      console.error('Error generating PDF:', err);
    });
};

export default generateBookingPDF;