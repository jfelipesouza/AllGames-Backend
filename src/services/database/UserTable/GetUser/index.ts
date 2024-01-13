import { prisma } from '../..'

export const findUserById = async (id: string) => {
  let response = null
  try {
    const user = await prisma.user.findFirst({
      where: {
        id
      },
      include: {
        adminProfile: {
          include: {
            events: {
              include: {
                eventInfo: true
              }
            }
          }
        },
        image: true,
        profile: {
          include: {
            events: {
              include: {
                event: {
                  include: {
                    eventInfo: true
                  }
                }
              }
            }
          }
        }
      }
    })
    if (user) {
      response = {
        id: user.id,
        type: user.type,
        confirmAccount: user.confirmAccount,
        confirmAccountExprires: user.confirmAccountExpires,
        passResetExpires: user.passwordResetExpires,
        passResetToken: user.passwordResetToken,
        confirmAccountCode: user.confirmCode,
        password: user.password,
        email: user.email,
        profile: { ...user.profile },
        adminProfile: { ...user.adminProfile },
        image: { ...user.image }
      }
    }
  } catch (error) {
    console.error(error)
  } finally {
    return response
  }
}

export const findUserByEmail = async (email: string) => {
  let response = null

  try {
    const user = await prisma.user.findFirst({
      where: {
        email
      },
      include: {
        adminProfile: {
          include: {
            events: {
              include: {
                eventInfo: true
              }
            }
          }
        },
        image: {
          select: {
            id: true,
            name: true,
            url: true
          }
        },
        profile: {
          include: {
            events: {
              include: {
                event: {
                  include: {
                    eventInfo: true
                  }
                }
              }
            }
          }
        }
      }
    })
    if (user) {
      response = {
        id: user.id,
        type: user.type,
        confirmAccount: user.confirmAccount,
        confirmAccountExprires: user.confirmAccountExpires,
        passResetExpires: user.passwordResetExpires,
        passResetToken: user.passwordResetToken,
        confirmAccountCode: user.confirmCode,
        password: user.password,
        email: user.email,
        profile: { ...user.profile },
        adminProfile: { ...user.adminProfile },
        image: { ...user.image }
      }
    } else {
      return null
    }
  } catch (err) {
    console.error(err)
  } finally {
    return response
  }
}

export const allInformationById = async (id: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id
      },
      select: {
        id: true,
        email: true,
        profile: {
          include: {
            events: {
              include: {
                event: {
                  include: {
                    eventInfo: {
                      include: {
                        paragraphs: {
                          include: { content: true, eventInformation: true }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        adminProfile: {
          include: {
            events: {
              include: {
                eventInfo: {
                  include: {
                    paragraphs: {
                      include: { content: true, eventInformation: true }
                    }
                  }
                }
              }
            }
          }
        },
        image: true,
        confirmAccount: true,
        type: true
      }
    })
    return user
  } catch (error) {
    console.error(error)
    return null
  } finally {
    await prisma.$disconnect()
  }
}
