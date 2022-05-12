import React from 'react'
import "./_Editor.scss"
import AceEditor from "react-ace";

export default function Output() {
  return (
      <pre className='Output ace-solarized-dark ace_editor'>{`
      hey
      they
      `}</pre>
  )
}
