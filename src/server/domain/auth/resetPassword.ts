import "server-only";

import {
  createPasswordResetToken,
  verifyPasswordResetToken,
} from "./utils/jwt";
import { updateUserPassword } from "../users/private/update_password";
import { getUserByMail } from "../users/private/get_user_by_mail";
import { sendMail } from "../../../utils/mail/sendmail";

export const resetPassword = async ({
  token,
  newPassword,
}: {
  token: string;
  newPassword: string;
}) => {
  try {
    if (!token || !newPassword) {
      return {
        result: "Geçersiz istek.",
      };
    }

    const { userId } = await verifyPasswordResetToken(token);

    await updateUserPassword({
      id: userId,
      password: newPassword,
    });

    return {
      result: "success",
    };
  } catch {
    return {
      result: "Şifre sıfırlama işlemi başarısız oldu.",
    };
  }
};

export const requestPasswordReset = async ({
  email,
  host,
}: {
  email: string;
  host: string;
}) => {
  try {
    const user = await getUserByMail({ email });

    if (user.result.status !== "active" || !user || !user.result) {
      return {
        result: "Bu e-posta adresine sahip aktif bir kullanıcı bulunamadı.",
      };
    }

    const passwordResetToken = await createPasswordResetToken({
      userId: user.result.id,
    });

    await sendMail({
      to: email,
      subject: "Şifre Sıfırlama Talebi",
      text: `Şifre sıfırlama talebiniz alındı. Aşağıdaki bağlantıyı kullanarak şifrenizi sıfırlayabilirsiniz: ${host}/sifresifirla?m=${passwordResetToken}`,
    });

    return {
      result: "success",
    };
  } catch {
    return {
      result: "Şifre sıfırlama talebi işlenirken bir hata oluştu.",
    };
  }
};
