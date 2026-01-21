import { Button } from "@chakra-ui/react"
import { Link } from "react-router-dom"

export default function CTAButton({href=null, text, onClick=null, isDisabled=false, type=null}) {
  const buttonProps = {
    fontSize: "1.2rem",
    px: 8,
    py: 6,
    borderRadius: "md",
    transition: "all 0.2s",
    backgroundColor: "#646cff",
    color: "white",
    isDisabled: isDisabled,
    _hover: {
      backgroundColor: "#535bf2",
      color: "white"
    },
    _active: {
      backgroundColor: "#535bf2"
    },
    _disabled: {
      opacity: 0.5,
      cursor: "not-allowed"
    },
    ...(type && { type })
  }

  // If onClick is provided, use regular button
  if (onClick) {
    return (
      <Button 
        {...buttonProps}
        onClick={onClick}
      >
        {text}
      </Button>
    )
  }

  // If href is provided, use Link
  if (href) {
    return (
      <Button {...buttonProps}
        as={Link} 
        to={href}
      >
        {text}
      </Button>
    )
  }

  // If neither href nor onClick, just a button
  return (
    <Button {...buttonProps}>
      {text}
    </Button>
  )
}
