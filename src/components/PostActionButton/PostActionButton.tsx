import React from "react";
import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler;
  className?: string;
};

const PostActionButton = ({ className, children, ...props }: Props) => {
  return (
    <motion.div
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 1.0 }}
      className={`${className && className} cursor-pointer`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default PostActionButton;
