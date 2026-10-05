export async function downloadReportAsPDF(
  reportElementId: string,
  fileName: string = 'The_RAGE_Oracle_Strategic_Report.pdf'
): Promise<boolean> {
  try {
    const [{ jsPDF }, { default: html2canvas }] = await Promise.all([
      import('jspdf'),
      import('html2canvas'),
    ]);
    const element = document.getElementById(reportElementId);
    if (!element) {
      console.error(`Report element #${reportElementId} not found.`);
      return false;
    }

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const marginX = 8; // 8mm horizontal margins
    const marginTop = 8; // 8mm top margin
    const marginBottom = 8; // 8mm bottom margin
    const printableWidth = pageWidth - marginX * 2; // 194mm
    const printableHeight = pageHeight - marginTop - marginBottom; // 281mm

    const modules = Array.from(element.querySelectorAll('.print-module')) as HTMLElement[];

    if (modules.length > 0) {
      let currentPageY = marginTop;
      let isFirstPage = true;

      for (let i = 0; i < modules.length; i++) {
        const mod = modules[i];
        const canvas = await html2canvas(mod, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#09090B',
          windowWidth: 1000,
        });

        const imgData = canvas.toDataURL('image/png');
        const moduleImgHeight = (canvas.height * printableWidth) / canvas.width;
        const moduleBounds = mod.getBoundingClientRect();
        const moduleScale = printableWidth / moduleBounds.width;

        // Check if adding this module exceeds printable height on current page
        if (!isFirstPage && (currentPageY + moduleImgHeight > pageHeight - marginBottom)) {
          pdf.addPage();
          currentPageY = marginTop;
        }

        // Handle case where single module is taller than 1 full page
        if (moduleImgHeight > printableHeight) {
          let heightLeft = moduleImgHeight;
          let canvasSliceY = 0;

          while (heightLeft > 0) {
            if (!isFirstPage && currentPageY === marginTop) {
              // fresh page
            } else if (!isFirstPage) {
              pdf.addPage();
              currentPageY = marginTop;
            }

            const pageSliceHeight = Math.min(heightLeft, printableHeight);
            pdf.addImage(
              imgData,
              'PNG',
              marginX,
              currentPageY - canvasSliceY,
              printableWidth,
              moduleImgHeight
            );

            heightLeft -= pageSliceHeight;
            canvasSliceY += pageSliceHeight;

            if (heightLeft > 0) {
              pdf.addPage();
              currentPageY = marginTop;
            }
          }
          currentPageY = marginTop + (moduleImgHeight % printableHeight) + 4;
        } else {
          pdf.addImage(
            imgData,
            'PNG',
            marginX,
            currentPageY,
            printableWidth,
            moduleImgHeight
          );
          mod.querySelectorAll('a[href]').forEach(link => {
            const href = (link as HTMLAnchorElement).href;
            if (!/^https?:\/\//i.test(href)) return;

            const bounds = link.getBoundingClientRect();
            const linkX = marginX + (bounds.left - moduleBounds.left) * moduleScale;
            const linkY = currentPageY + (bounds.top - moduleBounds.top) * moduleScale;
            const linkWidth = bounds.width * moduleScale;
            const linkHeight = bounds.height * moduleScale;
            if (linkY + linkHeight <= pageHeight - marginBottom) {
              pdf.link(linkX, linkY, linkWidth, linkHeight, { url: href });
            }
          });
          currentPageY += moduleImgHeight + 5; // 5mm spacing between modules on same page
        }

        isFirstPage = false;
      }
    } else {
      // Fallback single canvas capture
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#09090B',
        windowWidth: 1000,
      });

      const imgData = canvas.toDataURL('image/png');
      const imgHeight = (canvas.height * printableWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = marginTop;

      pdf.addImage(imgData, 'PNG', marginX, position, printableWidth, imgHeight);
      heightLeft -= printableHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight + marginTop;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', marginX, position, printableWidth, imgHeight);
        heightLeft -= printableHeight;
      }
    }

    pdf.save(fileName);
    return true;
  } catch (err) {
    console.error('PDF generation error:', err);
    window.print();
    return true;
  }
}
