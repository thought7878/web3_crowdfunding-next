"use client"

import React, { useState } from "react"
import Link from "next/link"
import { logo, sun } from "../../public/assets"
import { navlinks } from "../constants"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface IIcon {
  imgUrl: string
  name?: string
  activeName?: string
  disabled?: boolean
  styles?: string
  handleClick?: () => void
}

const Icon = ({
  styles,
  name,
  imgUrl,
  activeName,
  disabled,
  handleClick,
}: IIcon) => (
  <div
    className={`w-[48px] h-[48px] rounded-[10px] ${
      activeName && activeName === name && "bg-[#2c2f32]"
    } flex justify-center items-center ${
      !disabled && "cursor-pointer"
    } ${styles}`}
    onClick={handleClick}
  >
    {!activeName ? (
      <Image src={imgUrl} alt={name ?? ""} className="w-1/2 h-1/2" />
    ) : (
      <Image
        src={imgUrl}
        alt={name ?? ""}
        className={`w-1/2 h-1/2 ${activeName !== name && "grayscale"}`}
      />
    )}
  </div>
)

const Sidebar = () => {
  // const navigate = useNavigate()
  const router = useRouter()
  const [activeName, setActiveName] = useState("dashboard")

  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
      {/* logo */}
      <Link href="/">
        <Icon styles="w-[52px] h-[52px] bg-[#2c2f32]" imgUrl={logo} />
      </Link>
      {/* navigation menu */}
      <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((link) => (
            <Icon
              key={link.name}
              {...link}
              activeName={activeName}
              handleClick={() => {
                if (!link.disabled) {
                  setActiveName(link.name)
                  router.push(link.link)
                }
              }}
            />
          ))}
        </div>
        {/* switch theme button */}
        <Icon styles="bg-[#1c1c24] shadow-secondary" imgUrl={sun} />
      </div>
    </div>
  )
}

export default Sidebar
