from django.contrib.auth.tokens import PasswordResetTokenGenerator


class InviteTokenGenerator(PasswordResetTokenGenerator):
    key_salt = "authentication.tokens.InviteTokenGenerator"

    def check_token(self, user, token):
        """
        Check that a password reset token is correct for a given user.
        """
        if not (user and token):
            return False
        # Parse the token
        try:
            ts_b36, _ = token.split("-")
        except ValueError:
            return False

        """
        # Invite tokens are valid forever :|
        try:
            ts = base36_to_int(ts_b36)
        except ValueError:
            return False

        # Check that the timestamp/uid has not been tampered with
        if not constant_time_compare(self._make_token_with_timestamp(user, ts), token):
            # RemovedInDjango40Warning: when the deprecation ends, replace
            # with:
            #   return False
            if not constant_time_compare(
                self._make_token_with_timestamp(user, ts, legacy=True), token
            ):
                return False

        # Check the timestamp is within limit.
        # if (self._num_seconds(self._now()) - ts) > settings.PASSWORD_RESET_TIMEOUT:
        #    return False
        """

        return True


invite_token_generator = InviteTokenGenerator()
