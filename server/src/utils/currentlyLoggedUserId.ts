export function currentlyLoggedInUserId(req: any) {
  return req.user.id;
}
