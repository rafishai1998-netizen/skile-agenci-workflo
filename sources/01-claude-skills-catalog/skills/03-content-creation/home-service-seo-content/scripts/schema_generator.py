import json

def generate_schema(business_info):
    schema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": business_info.get("name"),
        "image": business_info.get("image", ""),
        "@id": business_info.get("url", ""),
        "url": business_info.get("url", ""),
        "telephone": business_info.get("phone"),
        "priceRange": business_info.get("price_range", "$$"),
        "address": {
            "@type": "PostalAddress",
            "streetAddress": business_info.get("street_address"),
            "addressLocality": business_info.get("city"),
            "addressRegion": business_info.get("state"),
            "postalCode": business_info.get("zip_code"),
            "addressCountry": "US"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": business_info.get("latitude"),
            "longitude": business_info.get("longitude")
        },
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday"
                ],
                "opens": "08:00",
                "closes": "17:00"
            }
        ],
        "sameAs": business_info.get("social_profiles", [])
    }

    if business_info.get("service_area"):
        schema["areaServed"] = {
            "@type": "GeoCircle",
            "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": business_info.get("latitude"),
                "longitude": business_info.get("longitude")
            },
            "geoRadius": business_info.get("service_radius", "10")
        }

    return json.dumps(schema, indent=4)
