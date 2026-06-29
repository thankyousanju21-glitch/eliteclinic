// Configuration Data
const clinicData = {
    clinicName: "Elite Multi Speciality Clinic",
    fullName: "Elite Medical and General Store & Elite Multi Speciality Clinic",
    doctorName: "Dr. Salman",
    doctorQualification: "MBBS, MD (Internal Medicine)",
    doctorSpecialization: "General Physician & Primary Care Specialist",
    tagline: "Your Health, Our Priority - Comprehensive Care Under One Roof",
    experience: "10+ Years",
    phone: "+91 6360627924",
    whatsappNumber: "919217002598", // For WhatsApp API (without +)
    whatsappDisplay: "+91 9217002598",
    email: "contact@eliteclinic.com", // Placeholder
    address: "49/2 Ground Floor, Hadosiddhapura, Carmelaram Post, Thomas Layout Hado Siddapura, Karnataka 560035",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15555.26359553555!2d77.69742415518296!3d12.919532840902894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae13a404983057%3A0xe212c19c5957dcf7!2sHadosiddapura%2C%20Carmelaram%2C%20Bengaluru%2C%20Karnataka%20560035!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    timings: "Monday to Sunday: 8:30 AM to 10:30 PM",
    socialMedia: {
        facebook: "#",
        instagram: "#",
        twitter: "#"
    },
    services: [
        {
            id: "general-medicine",
            title: "General Medicine",
            icon: "fa-stethoscope",
            description: "Comprehensive medical consultations for acute and chronic conditions, viral fevers, and routine checkups.",
            benefits: ["Quick diagnosis", "Evidence-based treatment", "Follow-up care"],
            image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: "pediatrics",
            title: "Pediatrics",
            icon: "fa-child",
            description: "Expert care for infants, children, and adolescents, including vaccinations and wellness checkups.",
            benefits: ["Child-friendly environment", "Vaccination schedules", "Nutritional guidance"],
            image: "https://images.unsplash.com/photo-1584516150909-c43483ee7932?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: "preventive-care",
            title: "Preventive Care",
            icon: "fa-heartbeat",
            description: "Customized health checkup packages for corporate professionals, executives, and families.",
            benefits: ["Early detection", "Comprehensive screenings", "Lifestyle counseling"],
            image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: "pharmacy",
            title: "24/7 Pharmacy Integration",
            icon: "fa-pills",
            description: "In-house general store and pharmacy ensuring immediate access to prescribed medications.",
            benefits: ["Zero waiting time", "Wide range of medicines", "FMCG products available"],
            image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&q=80&w=800"
        }
    ]
};

// Function to populate data on the page
function populateData() {
    const elements = document.querySelectorAll('[data-config]');
    elements.forEach(el => {
        const key = el.getAttribute('data-config');
        
        // Handle nested properties if needed (e.g. socialMedia.facebook)
        const keys = key.split('.');
        let value = clinicData;
        for (let k of keys) {
            value = value[k];
        }

        if (value) {
            if (el.tagName === 'A' && el.classList.contains('phone-link')) {
                el.href = `tel:${value.replace(/ /g, '')}`;
                if(!el.hasAttribute('data-no-text')) el.textContent = value;
            } else if (el.tagName === 'A' && el.classList.contains('whatsapp-link')) {
                el.href = `https://wa.me/${clinicData.whatsappNumber}`;
                if(!el.hasAttribute('data-no-text')) el.textContent = clinicData.whatsappDisplay;
            } else if (el.tagName === 'A' && el.classList.contains('email-link')) {
                el.href = `mailto:${value}`;
                if(!el.hasAttribute('data-no-text')) el.textContent = value;
            } else if (el.tagName === 'IFRAME') {
                el.src = value;
            } else {
                el.innerHTML = value;
            }
        }
    });
}

// Function to handle the Appointment Form
function handleAppointmentSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    
    // Get form values
    const name = form.querySelector('#patientName').value;
    const phone = form.querySelector('#patientPhone').value;
    const age = form.querySelector('#patientAge').value;
    const gender = form.querySelector('#patientGender').value;
    const date = form.querySelector('#appointmentDate').value;
    const time = form.querySelector('#appointmentTime').value;
    const service = form.querySelector('#serviceRequired').value;
    const message = form.querySelector('#patientMessage').value;

    // Construct WhatsApp Message
    const text = `Hello ${clinicData.doctorName},

I would like to book an appointment.

Patient Name: ${name}
Mobile Number: ${phone}
Age: ${age}
Gender: ${gender}
Preferred Date: ${date}
Preferred Time: ${time}
Service: ${service}

Additional Message:
${message}

Please confirm my appointment.

Thank You.`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${clinicData.whatsappNumber}?text=${encodedText}`;
    
    // Redirect to WhatsApp
    window.open(whatsappUrl, '_blank');
}

// Mobile Navigation Toggle
function setupMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close nav when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Update copyright year
function updateCopyright() {
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
}

// Set minimum date for appointment to today
function setMinDate() {
    const dateInput = document.getElementById('appointmentDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
}

// Populate Services dropdown in forms
function populateServiceDropdown() {
    const dropdowns = document.querySelectorAll('select#serviceRequired');
    dropdowns.forEach(dropdown => {
        clinicData.services.forEach(service => {
            const option = document.createElement('option');
            option.value = service.title;
            option.textContent = service.title;
            dropdown.appendChild(option);
        });
    });
}

// Smooth scrolling for anchor links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    populateData();
    setupMobileNav();
    updateCopyright();
    setMinDate();
    populateServiceDropdown();
    setupSmoothScrolling();

    const appointmentForm = document.getElementById('appointment-form');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', handleAppointmentSubmit);
    }
});
