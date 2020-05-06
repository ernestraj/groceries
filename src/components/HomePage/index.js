import React from "react";
import "./index.scss";

export default function HomePage() {
	return (
		<div className="container">
			<div className="jumbotron mt-1 block-content">
				<h1 className="headline__intro">
					Join the vast community of Health Enthusiast
				</h1>
				<p className="mt-5 text-center">
					We are here to help you to manage your cooking, save your time doing
					grocery shopping, budget your grocery needs, find healthy dishes to
					maintain your healthy routine.
				</p>
				<hr class="my-4"></hr>
				<p className="lead mt-5 mb-0 text-center">
					<a
						className="btn mb-0 btn-primary btn-lg btn-highlight"
						href="#"
						role="button"
					>
						Sign Up
					</a>
					<a
						className="btn mb-0 btn-lg ml-3 btn-primary btn-bg-highlight"
						href="#"
						role="button"
					>
						Login
					</a>
				</p>
			</div>
			<div className="jumbotron" id="services">
				<div className="row">
					<div className="col-4">
						<h2 className="text-center">Community</h2>
						<p className="text-center">
							We need your help in return to grow this community, help people
							eat healthy and save each member's valuable time and money
						</p>
						<hr class="my-4"></hr>
						<p className="lead text-center">
							<a
								className="btn mb-0 btn-primary btn-lg btn-highlight"
								href="#"
								role="button"
							>
								Sign Up
							</a>
						</p>
					</div>
					<div className="col-4">
						<h2 className="text-center">Services</h2>
						<p className="text-center">
							Let's say no to unhealthy eating and budget your pantry. Login to
							Checkout Our services. We allow you to track your macros with your
							grocery purchase, budget it based on your needs.
						</p>
						<hr class="my-4"></hr>
						<p className="lead text-center">
							<a
								className="btn mb-0 btn-primary btn-lg btn-bg-highlight"
								href="#"
								role="button"
							>
								Join Now
							</a>
						</p>
					</div>
					<div className="col-4">
						{" "}
						<h2 className="text-center">Join Us For Business</h2>
						<p className="text-center">
							Yes its right we are open for business as well. Register with us
							as we offer the opportunity for working with us to deliver
							groceries to the doorstep of this beautiful community.
						</p>
						<hr class="my-4"></hr>
						<p className="lead text-center">
							<a
								className="btn mb-0 btn-primary btn-lg btn-highlight"
								href="#"
								role="button"
							>
								Sign Up
							</a>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
