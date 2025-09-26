import type { MotionProps } from "motion-v";
import { mergeMotions } from "./utils";

const transitionSpring: MotionProps = { transition: { type: "spring" } };

const fadeIn: MotionProps = { initial: { opacity: 0 }, animate: { opacity: 1 } };

const slideInFromTop: MotionProps = { initial: { y: -25 }, animate: { y: 0 } };

const slideInFromRight: MotionProps = { initial: { x: 25 }, animate: { x: 0 } };

const slideInFromBottom: MotionProps = { initial: { y: 25 }, animate: { y: 0 } };

const slideInFromLeft: MotionProps = { initial: { x: -25 }, animate: { x: 0 } };

export const fadeInFromTop: MotionProps = mergeMotions(transitionSpring, fadeIn, slideInFromTop);

export const fadeInFromRight: MotionProps = mergeMotions(transitionSpring, fadeIn, slideInFromRight);

export const fadeInFromBottom: MotionProps = mergeMotions(transitionSpring, fadeIn, slideInFromBottom);

export const fadeInFromLeft: MotionProps = mergeMotions(transitionSpring, fadeIn, slideInFromLeft);
