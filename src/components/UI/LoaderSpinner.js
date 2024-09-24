import React from "react";
import styles from "./LoaderSpinner.module.css";

const LoaderSpinner = () => {
	return (
		<div className="fixed flex h-full w-full items-center justify-center bg-teal-900">
			<div
				className={`${styles.loadWrapp} flex items-center justify-center gap-6 bg-black bg-opacity-35`}
			>
				<div className={`${styles.load} flex gap-3`}>
					<div className={styles.line}></div>
					<div className={styles.line}></div>
					<div className={styles.line}></div>
				</div>
			</div>
		</div>
	);
};

export default LoaderSpinner;
