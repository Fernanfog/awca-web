"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";

const NodeSphere = dynamic(() => import("./three/node-sphere"), { ssr: false });

/** Pantalla de inicio: esfera de nodos AWCA. Una vez por sesión. */
export function IntroLoader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // sessionStorage puede lanzar en incógnito/sandbox → nunca dejar el
    // overlay atascado por eso
    let seen = false;
    try {
      seen = !!sessionStorage.getItem("aw_intro");
      if (!seen) sessionStorage.setItem("aw_intro", "1");
    } catch {
      /* sin storage: mostrar la intro igual, una vez */
    }
    if (!seen) {
      document.body.style.overflow = "hidden";
    }

    const t = window.setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "";
    }, seen ? 0 : 1200);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-noche-950"
        >
          <div className="h-64 w-64 sm:h-72 sm:w-72">
            <NodeSphere />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="-mt-2 text-2xl font-semibold tracking-[0.18em] text-blanco"
          >
            AWCA
          </motion.p>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="tech-label mt-2 text-niebla-500"
          >
            Auditoría · Contabilidad · Tributación
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
