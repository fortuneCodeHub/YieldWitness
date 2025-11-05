"use client";

import { useCallback } from "react";
import { Particles as ParticlesReact } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export const Particles = ({ className }) => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine); // load the lightweight engine
  }, []);

  const options = {
    background: { color: { value: "transparent" } },
    particles: {
      color: { value: "#ffffff" },
      move: { enable: true, speed: 1 },
      number: { value: 100 },
      opacity: { value: 0.5 },
      size: { value: { min: 1, max: 3 } },
    },
  };

  return (
    <ParticlesReact
      id="tsparticles"
      className={className}
      init={particlesInit}
      options={options}
    />
  );
};
