import { Button } from "@chakra-ui/react"
import { Link } from "react-router-dom"

export default function CTAButton({href=null, text, onClick=null}) {
  const buttonProps = {
    fontSize: "1.2rem",
    px: 8,
    py: 6,
    borderRadius: "md",
    transition: "all 0.2s",
    backgroundColor: "#646cff",
    color: "white",
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
  }

  // Если есть onClick, используем обычную кнопку
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

  // Если есть href, используем Link
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

  // Если нет ни href, ни onClick, просто кнопка
  return (
    <Button {...buttonProps}>
      {text}
    </Button>
  )
}
