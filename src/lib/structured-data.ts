/**
 * Structured Data for SEO & Generative Engine Optimization (GEO)
 * 
 * These schemas help search engines and AI assistants understand your content better.
 * Optimized for: Google Search, Bing, ChatGPT, Google Assistant, Alexa
 */

// FAQ Schema - Critical for GEO and voice search
export const faqSchema = {
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What courses does MAAC Jaipur offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "MAAC Jaipur offers comprehensive courses in 3D Animation, Visual Effects (VFX), Game Design, Digital Filmmaking, Motion Graphics, and Digital Media & Design. We provide B.Voc degrees, diploma programs (18-24 months), and short-term skill enhancement courses. All programs are NSDC and MESC certified with 95% placement assistance."
      }
    },
    {
      "@type": "Question",
      "name": "What is the eligibility for animation courses at MAAC Jaipur?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Eligibility varies by program: (1) B.Voc in 3D Animation & VFX requires 10+2 completion with minimum 50% marks. (2) Diploma programs accept students aged 18+ with 10+2 or equivalent. (3) Short-term skill enhancement courses are open to anyone with basic computer knowledge. No prior artistic or technical background required for most programs."
      }
    },
    {
      "@type": "Question",
      "name": "What is the course fee for animation and VFX programs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Course fees at MAAC Jaipur range from ₹50,000 to ₹2,50,000 depending on the program duration and specialization. B.Voc programs (3 years) cost approximately ₹1,80,000 per year. Diploma programs (18-24 months) range from ₹1,00,000 to ₹1,80,000. We offer EMI options, education loans, and merit-based scholarships. Contact us at +91-7300001589 for detailed fee structure."
      }
    },
    {
      "@type": "Question",
      "name": "Does MAAC Jaipur provide placement assistance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, MAAC Jaipur has a dedicated placement cell with a 95% placement record. Our students are placed at top studios including DNEG, Prime Focus, Redchillies VFX, MPC, Technicolor, Ubisoft, EA Games, and Rockstar Games. Average starting packages range from 3-6 LPA, with top performers securing 8-12 LPA. We provide resume building, portfolio development, mock interviews, and direct studio connections."
      }
    },
    {
      "@type": "Question",
      "name": "Is B.Voc degree available at MAAC Jaipur?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, MAAC Jaipur offers B.Voc (Bachelor of Vocation) in 3D Animation & VFX, a UGC-recognized 3-year undergraduate degree. The program combines practical industry training with academic learning. Students earn multiple certifications: Advanced Diploma after 2 years, Diploma after 1 year, and B.Voc degree upon completion. This allows students to enter the workforce at multiple exit points."
      }
    },
    {
      "@type": "Question",
      "name": "What software and tools will I learn at MAAC Jaipur?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Students gain proficiency in industry-standard software including: Autodesk Maya, 3ds Max, ZBrush for 3D modeling; Adobe After Effects, Nuke, Fusion for VFX compositing; Unreal Engine, Unity for game development; DaVinci Resolve, Premiere Pro for video editing; Photoshop, Illustrator for digital art. Our curriculum is updated regularly to include emerging technologies like AI tools, real-time rendering, and VR/AR."
      }
    },
    {
      "@type": "Question",
      "name": "Can I get a free demo class before admission?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely! MAAC Jaipur offers free demo classes so you can experience our teaching methodology, infrastructure, and software before making a decision. Schedule a demo class by calling +91-7300001589, visiting our center at Subhash Marg, Jaipur, or filling out the contact form on our website. We also offer career counseling sessions to help you choose the right course."
      }
    },
    {
      "@type": "Question",
      "name": "What is the class schedule and duration?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We offer flexible schedules to accommodate different needs: (1) Regular batches: Monday to Saturday, 9 AM - 12 PM or 12 PM - 3 PM. (2) Weekend batches: Saturday and Sunday, 10 AM - 4 PM for working professionals and college students. (3) Evening batches: 4 PM - 7 PM. Program durations range from 6 months (skill enhancement) to 3 years (B.Voc). Each session includes 2-3 hours of practical lab work."
      }
    },
    {
      "@type": "Question",
      "name": "What makes MAAC Jaipur the best animation institute?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "MAAC Jaipur stands out with: 30+ years of excellence in animation education; 95% placement rate with 500+ hiring partners; NSDC and MESC government certification; B.Voc degree option; State-of-the-art labs with latest software; Expert faculty from top studios like DNEG and Prime Focus; Industry-integrated curriculum; Live studio projects; Strong alumni network of 50,000+ professionals; 100+ centers across India for placement mobility."
      }
    },
    {
      "@type": "Question",
      "name": "Are there scholarships or financial aid available?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, MAAC Jaipur offers multiple financial support options: (1) Merit-based scholarships up to 25% fee waiver for students with exceptional academic records or creative portfolios. (2) Education loans through tie-ups with leading banks. (3) No-cost EMI options for easy monthly payments. (4) Special discounts for early admissions and group enrollments. Contact our admissions team for personalized financial planning."
      }
    }
  ]
};

// Course Schema - For each program
export const getCourseSchema = (courseName: string, description: string, duration: string, provider: string = "MAAC Jaipur") => ({
  "@type": "Course",
  "name": courseName,
  "description": description,
  "provider": {
    "@type": "EducationalOrganization",
    "name": provider,
    "sameAs": "https://www.maacanimationjaipur.com"
  },
  "educationalCredential": "Diploma / B.Voc Degree",
  "duration": duration,
  "courseMode": "On-site",
  "coursePrerequisites": "10+2 or equivalent (for diploma programs)",
  "offers": {
    "@type": "Offer",
    "category": "Paid",
    "priceCurrency": "INR",
    "availability": "https://schema.org/InStock",
    "eligibleRegion": {
      "@type": "Country",
      "name": "IN"
    }
  },
  "hasCourseInstance": {
    "@type": "CourseInstance",
    "courseMode": "On-site",
    "courseWorkload": "PT20H", // 20 hours per week
    "instructor": {
      "@type": "Person",
      "name": "Industry Professionals",
      "description": "Faculty with 10-15 years experience from top studios"
    }
  }
});

// LocalBusiness Schema - Enhanced with reviews and offerings
export const localBusinessSchema = {
  "@type": "EducationalOrganization",
  "name": "MAAC Jaipur — Maya Academy of Advanced Creativity",
  "alternateName": "MAAC Animation Institute Jaipur",
  "url": "https://www.maacanimationjaipur.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://www.maacanimationjaipur.com/maac-logo.png",
    "width": 512,
    "height": 512
  },
  "description": "Rajasthan's leading animation, VFX, and multimedia institute with 30+ years of excellence. Offering B.Voc degrees, diploma courses in 3D Animation, Visual Effects, Game Design, and Digital Filmmaking with 95% placement record.",
  "foundingDate": "1998",
  "numberOfEmployees": {
    "@type": "QuantitativeValue",
    "minValue": 20
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "711-712, Ambition Tower, 7th Floor, D-46B, Malan Ka Chauraha, Agrasain Circle, Subhash Marg, C Scheme",
    "addressLocality": "Jaipur",
    "addressRegion": "Rajasthan",
    "postalCode": "302001",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 26.9139,
    "longitude": 75.7842
  },
  "telephone": ["+917300001589", "+919829294037", "+919929059559"],
  "email": "maacanimationjaipur@gmail.com",
  "openingHours": "Mo-Sa 09:00-19:00",
  "priceRange": "₹₹",
  "paymentAccepted": "Cash, Credit Card, Debit Card, UPI, Education Loan",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Animation & VFX Courses",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Course",
          "name": "B.Voc in 3D Animation & VFX",
          "description": "3-year UGC-recognized undergraduate degree with multiple exit options"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Course",
          "name": "AD3D Edge — Advanced Program in 3D Animation",
          "description": "Advanced 3D animation with specialized character animation and studio pipeline"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Course",
          "name": "D3D — Program in 3D Animation",
          "description": "Comprehensive 3D animation covering modeling, texturing, animation, and rendering"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Course",
          "name": "DAFM — Diploma in Animation & Film Making",
          "description": "Digital animation and filmmaking with storyboard, editing, VFX, and post-production"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Course",
          "name": "APDMD — Advanced Program in Digital Media & Design",
          "description": "Comprehensive digital media and design program"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Course",
          "name": "Design Viz Pro",
          "description": "Visual communication, 3D visualization, and creative design thinking"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Course",
          "name": "DGDI — Program in Game Design & Integration",
          "description": "Game art, game design, level design, and engine integration"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Course",
          "name": "ADVFX — Advanced Program in Visual Effects",
          "description": "Advanced VFX with compositing, rotoscopy, paint prep, and CG integration"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Course",
          "name": "VFX Plus — Program in Visual Effects",
          "description": "Focused VFX training covering compositing, motion graphics, and VFX fundamentals"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Course",
          "name": "IPVAD — Integrated Program in Visual Art & Design",
          "description": "24-month integrated program combining visual art, design, animation, and digital media"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Course",
          "name": "CE Pro — Creative Entrepreneur Program",
          "description": "Creative skills combined with business acumen for aspiring freelancers"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Course",
          "name": "Maya Pro",
          "description": "Intensive Autodesk Maya training for animation, modeling, and VFX"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Course",
          "name": "DFM — Digital Film Making",
          "description": "Complete filmmaking from pre-production to post-production"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Course",
          "name": "MAX Pro",
          "description": "Intensive 3ds Max program for 3D modeling, texturing, and visualization"
        }
      }
    ]
  },
  "sameAs": [
    "https://www.facebook.com/maacjaipurcscheme",
    "https://www.instagram.com/maacjaipurcscheme",
    "https://www.youtube.com/@maac-jaipur-cscheme",
    "https://www.linkedin.com/company/maac-jaipur-cscheme",
    "https://www.wikidata.org/wiki/Q140635643",
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "422",
    "bestRating": "5",
    "worstRating": "1"
  },
  "award": "FICCI BAF Awards 2024 - Best Animation Institute",
  "department": {
    "@type": "EducationalOrganization",
    "name": "Placement Cell",
    "description": "Dedicated placement assistance with 95% success rate"
  },
  "alumni": {
    "@type": "AlumniOrganization",
    "name": "MAAC Alumni Network",
    "description": "50,000+ professionals working at top studios worldwide"
  }
};

// Review Schema - For testimonials
export const getReviewSchema = (author: string, role: string, rating: number = 5, text: string) => ({
  "@type": "Review",
  "itemReviewed": {
    "@type": "EducationalOrganization",
    "name": "MAAC Jaipur"
  },
  "author": {
    "@type": "Person",
    "name": author,
    "jobTitle": role
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": rating.toString(),
    "bestRating": "5"
  },
  "reviewBody": text,
  "datePublished": new Date().toISOString().split('T')[0]
});

// VideoObject Schema - For showreel
export const videoSchema = {
  "@type": "VideoObject",
  "name": "MAAC Jaipur Student Showreel 2024",
  "description": "Explore the incredible work created by MAAC Jaipur students across 3D Animation, VFX, Game Design, and Digital Filmmaking programs",
  "thumbnailUrl": [
    "https://www.maacanimationjaipur.com/og-image.jpg"
  ],
  "uploadDate": "2024-01-15",
  "duration": "PT3M45S",
  "contentUrl": "https://www.maacanimationjaipur.com/intro.mp4",
  "interactionCount": "15000",
  "publisher": {
    "@type": "EducationalOrganization",
    "name": "MAAC Jaipur",
    "sameAs": "https://www.maacanimationjaipur.com"
  }
};

// Breadcrumb Schema
export const breadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

// JobPosting Schema - For career pages
export const getJobSchema = (title: string, department: string, type: string = "Full-time") => ({
  "@type": "JobPosting",
  "title": title,
  "department": department,
  "employmentType": type,
  "hiringOrganization": {
    "@type": "EducationalOrganization",
    "name": "MAAC Jaipur",
    "sameAs": "https://www.maacanimationjaipur.com"
  },
  "jobLocation": {
    "@type": "Place",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Jaipur",
      "addressRegion": "Rajasthan",
      "addressCountry": "IN"
    }
  },
  "baseSalary": {
    "@type": "MonetaryAmount",
    "currency": "INR",
    "value": {
      "@type": "QuantitativeValue",
      "minValue": 300000,
      "maxValue": 600000,
      "unitText": "YEAR"
    }
  },
  "qualifications": "Diploma/Degree in Animation, VFX, or related field",
  "skills": "Maya, After Effects, Nuke, or relevant software proficiency",
  "experienceRequirements": {
    "@type": "OccupationalExperienceRequirements",
    "minimumMonthsOfExperience": 0
  },
  "educationRequirements": {
    "@type": "EducationalOccupationalCredential",
    "credentialCategory": "Diploma"
  }
});
