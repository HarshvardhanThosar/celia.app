enum MixpanelEvents {
  // User
  user_login = "user logged in",
  user_logout = "user logged out",
  user_register = "user registered",
  user_update_profile = "user updated profile",
  user_push_token_register = "user push token registered",
  user_session_start = "user session started",
  user_session_end = "user session ended",

  // App
  app_active = "app active",
  app_background = "app background",
  app_inactive = "app inactive",
  app_extension = "app extension",
  app_unknown = "app unknown",

  // Task
  task_create = "task created",
  task_update = "task updated",
  task_delete = "task deleted",
  task_complete = "task completed",
  task_share = "task shared",
  task_participate = "task participated",

  // Food
  retail_item_view = "retail item viewed",
  retail_item_redeem = "retail item redeemed",
  retail_item_share = "retail item shared",
}

export default MixpanelEvents;
