// lib/gtag.js
export const GA_MEASUREMENT_ID = 'G-H1QYN3T4M0'

// Log pageviews
export const pageview = (url) => {
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  })
}