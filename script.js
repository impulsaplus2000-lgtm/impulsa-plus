/**
 * IMPULSA+ | Agencia Publicitaria & Soluciones Digitales
 * JavaScript de Interacción, Validación y Envío de Formulario
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. Navegación Móvil (Hamburger Menu)
  // ==========================================
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', () => {
      const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
      mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
      navLinks.classList.toggle('active');
      const icon = mobileMenuToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    // Cerrar menú al hacer clic en cualquier enlace
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        const icon = mobileMenuToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }

  // ==========================================
  // 2. Header con Sombra al Scroll & Active Link
  // ==========================================
  const header = document.getElementById('header');
  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Header sticky shadow
    if (scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Botón volver arriba
    if (scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Resaltado de enlace activo con IntersectionObserver
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navItems.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));

  // ==========================================
  // 3. Preselección de Servicio en Formulario
  // ==========================================
  const serviceLinks = document.querySelectorAll('.service-cta-link[data-service]');
  const serviceSelect = document.getElementById('servicio');

  serviceLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const requestedService = link.getAttribute('data-service');
      if (serviceSelect && requestedService) {
        // Encontrar opción coincidente
        for (let i = 0; i < serviceSelect.options.length; i++) {
          if (serviceSelect.options[i].value === requestedService || 
              serviceSelect.options[i].text.includes(requestedService)) {
            serviceSelect.selectedIndex = i;
            break;
          }
        }
      }
    });
  });

  // ==========================================
  // 4. Acordeón de Preguntas Frecuentes (FAQ)
  // ==========================================
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Cerrar otros
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      // Alternar actual
      if (!isActive) {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ==========================================
  // 5. Copiar Código HEX al Portapapeles
  // ==========================================
  const hexSpans = document.querySelectorAll('.swatch-hex[data-copy]');
  hexSpans.forEach(span => {
    span.addEventListener('click', async () => {
      const hexCode = span.getAttribute('data-copy');
      try {
        await navigator.clipboard.writeText(hexCode);
        const originalHtml = span.innerHTML;
        span.innerHTML = `${hexCode} <i class="fa-solid fa-check" style="color: #10b981;"></i> ¡Copiado!`;
        setTimeout(() => {
          span.innerHTML = originalHtml;
        }, 2000);
      } catch (err) {
        console.error('Error al copiar:', err);
      }
    });
  });



  // ==========================================
  // 7. Formulario de Contacto & Envío de Correo
  //    Destinatario: impulsaplus2000@gmail.com
  // ==========================================
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const formStatusAlert = document.getElementById('formStatusAlert');

  const errorNombre = document.getElementById('error-nombre');
  const errorEmail = document.getElementById('error-email');
  const errorTelefono = document.getElementById('error-telefono');
  const errorEmpresa = document.getElementById('error-empresa');
  const errorServicio = document.getElementById('error-servicio');
  const errorMensaje = document.getElementById('error-mensaje');
  const errorConsentimiento = document.getElementById('error-consentimiento');

  function clearErrors() {
    [errorNombre, errorEmail, errorTelefono, errorEmpresa, errorServicio, errorMensaje, errorConsentimiento].forEach(el => {
      if (el) el.textContent = '';
    });
    if (formStatusAlert) {
      formStatusAlert.style.display = 'none';
      formStatusAlert.className = 'form-alert';
      formStatusAlert.innerHTML = '';
    }
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function getFormValues() {
    return {
      nombre: (document.getElementById('nombre')?.value || '').trim(),
      email: (document.getElementById('email')?.value || '').trim(),
      telefono: (document.getElementById('telefono')?.value || '').trim(),
      empresa: (document.getElementById('empresa')?.value || '').trim(),
      servicio: document.getElementById('servicio')?.value || '',
      presupuesto: document.getElementById('presupuesto')?.value || '',
      mensaje: (document.getElementById('mensaje')?.value || '').trim(),
      consentimiento: document.getElementById('consentimiento')?.checked || false
    };
  }

  function generateEmailContent(data) {
    const subject = `🚀 Nueva Cotización: ${data.nombre || 'Cliente'} (${data.empresa || 'Negocio'}) - Impulsa+`;
    const body = 
`Hola equipo de Impulsa+,

Quiero solicitar una cotización para mi proyecto:

• Nombre del cliente: ${data.nombre || 'No especificado'}
• Correo de contacto: ${data.email || 'No especificado'}
• Teléfono / WhatsApp: ${data.telefono || 'No especificado'}
• Nombre de mi negocio: ${data.empresa || 'No especificado'}
• Servicio de interés: ${data.servicio || 'General'}
• Presupuesto estimado: ${data.presupuesto || 'Por definir'}

Detalles del proyecto y objetivos:
${data.mensaje || 'Solicito contacto para más información.'}

---
Enviado desde el sitio web oficial de Impulsa+`;

    return {
      subject,
      body,
      gmailUrl: `https://mail.google.com/mail/?view=cm&fs=1&to=impulsaplus2000@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
      mailtoUrl: `mailto:impulsaplus2000@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
      whatsappUrl: `https://wa.me/573000000000?text=${encodeURIComponent(body)}`
    };
  }

  // ==========================================
  // Botones de Envío Directo Alternativo
  // ==========================================
  const btnDirectGmail = document.getElementById('btnDirectGmail');
  const btnDirectMailto = document.getElementById('btnDirectMailto');
  const btnDirectWhatsApp = document.getElementById('btnDirectWhatsApp');

  if (btnDirectGmail) {
    btnDirectGmail.addEventListener('click', () => {
      const data = getFormValues();
      const content = generateEmailContent(data);
      window.open(content.gmailUrl, '_blank', 'noopener');
    });
  }

  if (btnDirectMailto) {
    btnDirectMailto.addEventListener('click', () => {
      const data = getFormValues();
      const content = generateEmailContent(data);
      window.location.href = content.mailtoUrl;
    });
  }

  if (btnDirectWhatsApp) {
    btnDirectWhatsApp.addEventListener('click', () => {
      const data = getFormValues();
      const content = generateEmailContent(data);
      window.open(content.whatsappUrl, '_blank', 'noopener');
    });
  }

  // ==========================================
  // Envío Principal del Formulario a impulsaplus2000@gmail.com
  // ==========================================
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      clearErrors();

      const data = getFormValues();
      let isValid = true;

      // Validaciones
      if (!data.nombre) {
        if (errorNombre) errorNombre.textContent = 'Por favor ingresa tu nombre completo.';
        isValid = false;
      }

      if (!data.email) {
        if (errorEmail) errorEmail.textContent = 'Por favor ingresa tu correo electrónico.';
        isValid = false;
      } else if (!validateEmail(data.email)) {
        if (errorEmail) errorEmail.textContent = 'Por favor ingresa un correo electrónico válido.';
        isValid = false;
      }

      if (!data.telefono) {
        if (errorTelefono) errorTelefono.textContent = 'Por favor ingresa tu número telefónico o WhatsApp.';
        isValid = false;
      }

      if (!data.empresa) {
        if (errorEmpresa) errorEmpresa.textContent = 'Por favor indícanos el nombre de tu negocio o proyecto.';
        isValid = false;
      }

      if (!data.servicio) {
        if (errorServicio) errorServicio.textContent = 'Por favor selecciona el servicio de tu interés.';
        isValid = false;
      }

      if (!data.mensaje) {
        if (errorMensaje) errorMensaje.textContent = 'Por favor detalla brevemente lo que necesitas.';
        isValid = false;
      }

      if (!data.consentimiento) {
        if (errorConsentimiento) errorConsentimiento.textContent = 'Debes aceptar el envío de información.';
        isValid = false;
      }

      if (!isValid) {
        const firstError = document.querySelector('.field-error:not(:empty)');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }

      // Estado de carga en el botón
      const btnText = submitBtn.querySelector('.btn-text');
      const btnSpinner = submitBtn.querySelector('.btn-spinner');
      submitBtn.disabled = true;
      if (btnText && btnSpinner) {
        btnText.style.display = 'none';
        btnSpinner.style.display = 'inline-block';
      }

      // 1. Configurar asunto dinámico para el envío
      const formSubjectInput = document.getElementById('formSubject');
      if (formSubjectInput) {
        formSubjectInput.value = `🚀 Nueva Cotización: ${data.nombre} (${data.empresa}) - Impulsa+`;
      }

      // 2. Realizar el envío real vía el formulario HTML hacia FormSubmit
      // Se utiliza el prototipo nativo para asegurar la transmisión a través del iframe invisible
      try {
        HTMLFormElement.prototype.submit.call(contactForm);
      } catch (submitErr) {
        console.warn('Envío nativo:', submitErr);
      }

      // 3. Generar enlaces directos de respaldo instantáneo
      const emailContent = generateEmailContent(data);

      setTimeout(() => {
        if (formStatusAlert) {
          formStatusAlert.className = 'form-alert success';
          formStatusAlert.innerHTML = `
            <div class="success-card">
              <div class="success-header-row">
                <i class="fa-solid fa-circle-check"></i>
                <span>¡Mensaje transmitido con éxito!</span>
              </div>
              <p>Tu solicitud ha sido remitida hacia <strong>impulsaplus2000@gmail.com</strong>.</p>
              
              <div class="success-alert-tip">
                <i class="fa-solid fa-shield-halved"></i>
                <div>
                  <strong>Activación inicial para el propietario del correo:</strong><br>
                  La primera vez que se envía un correo a una dirección nueva mediante este servicio, FormSubmit envía un enlace de confirmación a <em>impulsaplus2000@gmail.com</em> con el título <em>"Confirm your email"</em>. Solo debes hacer clic en <strong>"Activate Form"</strong> una única vez.
                </div>
              </div>

              <p class="success-instant-lead"><strong>¿Deseas enviar una copia directa desde tu propio correo o WhatsApp ahora mismo?</strong></p>
              <div class="success-actions">
                <a href="${emailContent.gmailUrl}" target="_blank" rel="noopener" class="btn btn-gmail-action btn-sm">
                  <i class="fa-brands fa-google"></i> Abrir en Gmail Web
                </a>
                <a href="${emailContent.mailtoUrl}" class="btn btn-secondary btn-sm">
                  <i class="fa-solid fa-envelope"></i> Abrir en Outlook / Mail
                </a>
                <a href="${emailContent.whatsappUrl}" target="_blank" rel="noopener" class="btn btn-whatsapp btn-sm">
                  <i class="fa-brands fa-whatsapp"></i> Enviar por WhatsApp
                </a>
              </div>
            </div>
          `;
          formStatusAlert.style.display = 'block';
          formStatusAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        contactForm.reset();

        submitBtn.disabled = false;
        if (btnText && btnSpinner) {
          btnText.style.display = 'inline-block';
          btnSpinner.style.display = 'none';
        }
      }, 600);

    });
  }

});

