import Image from "next/image";

import { NoticeDialog } from "@/components/dialogs/notice-dialog";
import { siteConfig } from "@/config/site";

/**
 * Honest entry points for the future portals.
 *
 * MaaSetu has no authentication yet. Patient and doctor sign-in are
 * documented destinations (maa./doctors.maasetu.in) that are not live, so
 * these dialogs say exactly that — no fake sign-in forms. Legal notices
 * now live on their own pages (/privacy, /terms).
 */

function DialogMark() {
  return (
    <Image
      src="/brand/mark.png"
      alt=""
      width={44}
      height={34}
      className="h-auto w-auto"
    />
  );
}

function EmailNote() {
  return (
    <p className="border-t border-line pt-4 text-sm">
      Questions? Write to us at{" "}
      <a
        href={`mailto:${siteConfig.email}`}
        className="font-medium text-brand-500 underline underline-offset-4 hover:text-brand-600"
      >
        {siteConfig.email}
      </a>
      .
    </p>
  );
}

export function PatientLoginDialog({ trigger }: { trigger: React.ReactElement }) {
  return (
    <NoticeDialog
      trigger={trigger}
      title="Patient sign-in"
      description="The patient portal is on its way."
    >
      <DialogMark />
      <p>
        MaaSetu&apos;s patient experience is still being built, so there is
        nothing to sign in to just yet — we would rather tell you that
        plainly than show you a sign-in form that leads nowhere.
      </p>
      <p>
        When the platform opens, patients will sign in securely at{" "}
        <span className="font-medium text-ink">{siteConfig.subdomains.patients}</span>{" "}
        with an account created only once MaaSetu is ready to serve them.
      </p>
      <p className="rounded-xl bg-brand-50 px-4 py-3 text-sm text-brand-700">
        This website never asks for medical information.
      </p>
      <EmailNote />
    </NoticeDialog>
  );
}

export function DoctorLoginDialog({ trigger }: { trigger: React.ReactElement }) {
  return (
    <NoticeDialog
      trigger={trigger}
      title="Doctor & clinic sign-in"
      description="Tools for care teams are in preparation."
    >
      <DialogMark />
      <p>
        MaaSetu is being designed to give doctors and their staff structured
        patient context, organised follow-ups and smoother coordination with
        diagnostic laboratories. Those tools are not open yet.
      </p>
      <p>
        When the portal opens, doctors and their teams will sign in at{" "}
        <span className="font-medium text-ink">{siteConfig.subdomains.doctors}</span>.
      </p>
      <p>
        If you are a doctor, clinic or laboratory interested in shaping
        MaaSetu&apos;s early rollout, we would genuinely like to hear from you.
      </p>
      <EmailNote />
    </NoticeDialog>
  );
}
